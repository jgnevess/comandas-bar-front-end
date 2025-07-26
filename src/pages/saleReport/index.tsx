import React, { useEffect, useState } from "react";
import { SaleDetais } from "../../models/Models";
import { PDFViewer, Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { useSearchParams } from "react-router-dom";
import { handleSaleCompleteByPeriod } from "../../services/saleService/SaleService";

const SaleReport = () => {

    const [searchParams] = useSearchParams();
    const start = searchParams.get("start");
    const end = searchParams.get("end");
    const [sales, setSales] = useState<SaleDetais[]>()
    const [pix, setPix] = useState(0)
    const [dn, setDn] = useState(0)
    const [db, setDb] = useState(0)
    const [cr, setCr] = useState(0)

    useEffect(() => {
        handleSaleCompleteByPeriod(start!, end!).then(response => {
            setSales(response)
            setPix(response?.reduce((acc, s) => s.order.paymentType === "PIX" ? acc + s.order.totalPrice : acc + 0, 0))
            setDn(response?.reduce((acc, s) => s.order.paymentType === "DINHEIRO" ? acc + s.order.totalPrice : acc + 0, 0))
            setCr(response?.reduce((acc, s) => s.order.paymentType === "CREDITO" ? acc + s.order.totalPrice : acc + 0, 0))
            setDb(response?.reduce((acc, s) => s.order.paymentType === "DEBITO" ? acc + s.order.totalPrice : acc + 0, 0))
        })
    }, [])

    const Sales = sales?.map((s) => {
        const Items = s.order.items.map((i, k) => {
            return (
                <View style={styles.productContainer}>
                    <Text style={styles.descriptionItem}>{i.productName}</Text>
                    <View style={styles.detailsItem}>
                        <Text>Qtde: {i.quantity}</Text>
                        <Text>{i.unitPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
                    </View>
                </View>
            )
        })

        return (
            <View key={s.id} style={{ borderBottom: '1px solid #000', marginVertical: 10 }}>
                <View style={styles.details}>
                    <Text style={styles.description}>Cliente : {s.order.clientName}</Text>
                    <Text style={styles.text}>{new Date(s.order.orderDateTime).toLocaleString('pt-BR').split("T")[0].replace(",", " -")}</Text>
                </View>
                {Items}
                <View style={styles.details}>
                    <Text style={styles.description}>{s.order.paymentType}</Text>
                    <Text style={styles.description}>Total: {s.order.totalPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
                </View>
            </View>
        )
    })

    return (
        <div className="w-100 bg-light" style={{ height: "100vh" }}>
            <PDFViewer width={"100%"} height={"100%"}>
                <Document>
                    <Page size="A4" style={styles.page}>
                        <View style={styles.section}>
                            <View style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold', marginBottom: 5 }}>
                                <Text>Relatório de vendas</Text>
                            </View>
                            <View style={[styles.details, { borderBottom: '1px solid #000', marginVertical: 15 }]}>
                                <Text>Período: </Text>
                                <Text>{new Date(start! + 'T00:00:00').toLocaleString('pt-BR').split(",")[0]} - {new Date(end! + 'T23:59:59').toLocaleString('pt-BR').split(",")[0]}</Text>
                            </View>
                            {Sales}
                            <Text>Total por pagamento</Text>
                            <View style={styles.details}>
                                <Text>Pix: {pix.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
                                <Text>Dinheiro: {dn!.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
                                <Text>Crédito: {cr!.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
                                <Text>Débito: {db!.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
                            </View>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    )
}

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 20
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    text: {
        margin: 2
    },
    items: {
        fontSize: 12,
        margin: 2,
        borderBottom: '1px solid #000'
    },
    productContainer: {
        marginBottom: 8,
        marginTop: 8,
    },
    description: {
        fontWeight: 'bold',
    },
    descriptionItem: {
        fontWeight: 'bold',
        fontSize: 12
    },
    details: {
        fontSize: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailsItem: {
        fontSize: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footer: {
        fontSize: 12,
        fontWeight: 'bold',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default SaleReport