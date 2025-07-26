import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import CardContainer from "../../components/cardcontainer";
import MiniCard from "../../components/minicard";
import BigCard from "../../components/bigcard";
import { Page, Sale } from "../../models/Models";
import Saletable from "../../components/saletable";
import ProductForm from "../../components/productform";
import Container from "../../components/container";
import { useNavigate } from "react-router-dom";
import { handleProductsTotal } from "../../services/productService/productService";
import { handleOpenOrdersTotal } from "../../services/orderService/orderService";
import { handlelSalesToday, handleSalesValue, handleTotalSalesToday } from "../../services/saleService/SaleService";
import Alert from "../../components/alert";

const AdminDashboard = () => {

    const [totalProducts, setTotalProducts] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalSalesToday, setTotalSalesToday] = useState(0);
    const [salesToday, setSalesToday] = useState<Page | null>();
    const [salesTodayValue, setSalesTodayValue] = useState(0);
    const [totalValueSale, setTotalValueSale] = useState('0');
    const [reload, setReload] = useState(false)
    const [successAlert, setSuccessAlert] = useState(false)
    const [errorAlert, setErrorAlert] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    useEffect(() => {

        document.title = "Comandas - Admin";

        handleProductsTotal().then((data) => {
            if (data) {
                setTotalProducts(data.total)
            }
        });

        handleOpenOrdersTotal().then((data) => {
            if (data) {
                setTotalOrders(data.total)
            }
        });

        handleTotalSalesToday().then((data) => {
            if (data) {
                setTotalSalesToday(data.total)
            }
        });

        handlelSalesToday().then((response) => {
            if (response.status == 200) {
                const data = response.response as Page
                setSalesToday(data)
                setSalesTodayValue(data?.content.reduce((acc, element: Sale) => acc + element.totalPrice, 0))
            }

        });

        handleSalesValue().then(response => {
            if (response) {
                setTotalValueSale(response.toLocaleString("pt-br", { style: "currency", currency: "BRL" }))
            }
        });

    }, [reload])

    const onReload = (res: boolean, message?: string) => {
        handleAlert(res, message)
    }

    const handleAlert = (res: boolean, message?: string) => {
        if(res) {
            setReload(prev => !prev)
            setSuccessAlert(true)
            setTimeout(() => { setSuccessAlert(false) }, 2500)
        } else {
            setErrorAlert(true)
            setErrorMessage(message!)
            setTimeout(() => { setErrorAlert(false) }, 2500)
        }
    }

    return (
        <>
            <Navbar />
            {successAlert ? <Alert icon="bi-check-circle-fill" text="Produto cadastrado com sucesso" type="success" /> : ''}
            {errorAlert ? <Alert icon="bi-exclamation-circle-fill" text={errorMessage} type="danger" /> : ''}
            <Container>
                <>
                    <CardContainer>
                        <>
                            <MiniCard
                                width="22%"
                                header="Produtos cadastrados"
                                title={totalProducts}
                                link="/products" />
                            <MiniCard
                                width="22%"
                                header="Comandas abertas"
                                title={totalOrders}
                                link="/seller" />
                            <MiniCard
                                width="22%"
                                header="Total de vendas"
                                title={totalSalesToday}
                                link="/sales" />
                            <MiniCard
                                width="22%"
                                header="Valor Total de vendas"
                                title={totalValueSale!}
                                link="/sales" />
                        </>
                    </CardContainer>
                    <CardContainer>
                        <>
                            <BigCard
                                width="50%"
                                header="Vendas Hoje"
                                link="/sales"
                                totalSale={salesTodayValue}>
                                <Saletable sales={salesToday?.content!} page="admin"/>
                            </BigCard>
                            <BigCard
                                width="50%"
                                header="Cadastro rápido">
                                <ProductForm btnMessage="Cadastrar" onReload={(res, message) => onReload(res, message)} />
                            </BigCard>
                        </>
                    </CardContainer>
                </>
            </Container>
        </>
    )
}


export default AdminDashboard;