import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { handleSaleByid } from "../../services/saleService/SaleService";
import { SaleDetais } from "../../models/Models";
import { ErrorRequest } from "../../services/productService/productService";
import { Document, Page, Text, StyleSheet, View, PDFViewer } from "@react-pdf/renderer";


const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    text: {
        fontSize: 12,
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
        fontSize: 8,
        fontWeight: 'bold',
    },
    details: {
        fontSize: 6,
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




const TaxCoupon = () => {

    const param = useParams()
    const [sale, setSale] = useState<SaleDetais>()
    const [reload, setReload] = useState(false)


    useEffect(() => {
        handleGetSale()
        setReload(true)
    }, [reload])

    const handleGetSale = () => {
        if (!param.id) return;
        handleSaleByid(param.id).then(response => {
            if (response.status === 200) {
                const data = response.response as SaleDetais
                setSale(data)
            } else {
                const data = response.response as ErrorRequest
                alert(data)
            }
        })
        setReload(false)
    }


    const Items = sale?.order.items.map((i, k) => {
        return (
            <View style={styles.productContainer}>
                <Text style={styles.description}>{i.productName}</Text>
                <View style={styles.details}>
                    <Text>Qtde: {i.quantity}</Text>
                    <Text>{i.unitPrice.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</Text>
                </View>
            </View>
        )
    })

    return (
        <div className="w-100 bg-light" style={{ height: "100vh" }}>
            <PDFViewer width={"100%"} height={"100%"}>
                <Document>
                    <Page size={{ width: 164, height: 400 }} style={styles.page}>
                        <View style={styles.section}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
                                Arte Bola bar
                            </Text>
                            <Text style={{ fontSize: 8, marginBottom: 10, textAlign: 'center' }}>
                                Av. Alberto Santos Dumont, 831
                            </Text>
                            <Text style={styles.text}>
                                {new Date(sale?.order.orderDateTime!).toLocaleString('pt-BR').split("T")[0].replace(",", "")}
                            </Text>
                            <Text style={styles.text}>
                                Cliente: {sale?.order.clientName}
                            </Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', paddingTop: 5, borderTop: '0.5px solid #000' }}>
                                Consumo
                            </Text>
                            {Items}
                            <Text style={{borderBottom: '1px solid #000', marginBottom: 5}}></Text>
                            <View style={styles.footer}>
                                <Text>Total: </Text>
                                <Text>{sale?.order.totalPrice.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</Text>
                            </View>
                            <View style={styles.footer}>
                                <Text style={{marginTop: 5}}>Pagamento:</Text>
                                <Text style={{marginTop: 5}}>{sale?.order.paymentType.toLocaleLowerCase()}</Text>
                            </View>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    )
}



export default TaxCoupon;