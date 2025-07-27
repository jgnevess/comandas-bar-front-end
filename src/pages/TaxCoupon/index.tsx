import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { handleSaleByid } from "../../services/saleService/SaleService";
import { SaleDetais } from "../../models/Models";
import { ErrorRequest } from "../../services/productService/productService";
import { Document, Page, Text, StyleSheet, View, PDFViewer } from "@react-pdf/renderer";
import { Certificate } from "crypto";
import { Bar, handleRequestBar } from "../../services/barService/barService";


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
        fontSize: 8,
        textAlign: 'center'
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
        fontSize: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footer: {
        fontSize: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});




const TaxCoupon = () => {

    const param = useParams()
    const [sale, setSale] = useState<SaleDetais>()
    const [reload, setReload] = useState(false)
    const [bar, setBar] = useState<Bar>();

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
        const barId = localStorage.getItem('barId');
        if(barId) {
            handleRequestBar(Number.parseInt(barId)).then(response => {
                if(response.status === 200) {
                    const data = response.response as Bar
                    setBar(data)
                } else {

                }
            })
        }

        setReload(false)
    }

    const baseHeight = 160;
    const heightPerItem = 35;
    const itemCount = sale?.order.items.length || 0;
    const dynamicHeight = baseHeight + itemCount * heightPerItem;

    const Items = sale?.order.items.map((i, k) => {

        return (
            <View style={styles.productContainer}>
                <Text style={styles.description}>{i.productName}</Text>
                <View style={styles.details}>
                    <Text>Qtde: {i.quantity}</Text>
                    <Text>x</Text>
                    <Text>{i.unitPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
                    <Text>{(i.unitPrice * i.quantity).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
                </View>
            </View>
        )
    })

    return (
        <div className="w-100 bg-light" style={{ height: "100vh" }}>
            <PDFViewer width={"100%"} height={"100%"}>
                <Document>
                    <Page size={{ width: 164, height: dynamicHeight }} style={styles.page}>
                        <View style={styles.section}>
                            <Text style={styles.text}>
                                Cupom fiscal
                            </Text>
                            <Text style={styles.text}>
                                ******************************************
                            </Text>
                            <Text style={styles.text}>
                                {bar?.barName || "Bar"}
                            </Text>
                            <Text style={styles.text}>
                                {bar?.address.streetName || ""}, {bar?.address.streetNumber || ""}
                            </Text>
                            <View style={styles.footer}>
                                <Text style={{ fontSize: 8, marginBottom: 6, textAlign: 'center' }}>
                                    {new Date(sale?.order.orderDateTime!).toLocaleString('pt-BR').split("T")[0].split(",")[0]}
                                </Text>
                                <Text style={{ fontSize: 8, marginBottom: 6, textAlign: 'center' }}>
                                    {new Date(sale?.order.orderDateTime!).toLocaleString('pt-BR').split("T")[0].split(",")[1]}
                                </Text>
                            </View>
                            <Text style={styles.text}>
                                ******************************************
                            </Text>
                            <Text style={{
                                fontSize: 8,
                                textAlign: 'justify'
                            }}>
                                Cliente: {sale?.order.clientName}
                            </Text>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', paddingTop: 5 }}>
                                Consumo
                            </Text>
                            {Items}
                            <Text style={styles.text}>
                                ******************************************
                            </Text>
                            <View style={styles.footer}>
                                <Text>Total: </Text>
                                <Text>{sale?.order.totalPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
                            </View>
                            <View style={styles.footer}>
                                <Text style={{ marginTop: 5 }}>Pagamento:</Text>
                                <Text style={{ marginTop: 5 }}>{sale?.order.paymentType.toLocaleLowerCase()}</Text>
                            </View>
                            <Text style={{textAlign: 'center', fontWeight: 'bold', margin: 2}}>Volte sempre</Text>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    )
}



export default TaxCoupon;