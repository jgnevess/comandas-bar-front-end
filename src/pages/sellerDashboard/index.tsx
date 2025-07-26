import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import { PropsNavbar } from '../../components/navbar'
import Container from "../../components/container";
import CardContainer from "../../components/cardcontainer";
import MiniCard from "../../components/minicard";
import BigCard from "../../components/bigcard";
import OrderList from "../../components/orderList";
import Input from "../../components/inputwithlabel";
import { Page } from "../../models/Models";
import { handleClosedOrdersTotal, handleCreateOrder, handleOpenOrders, handleOpenOrdersTotal } from "../../services/orderService/orderService";
import { ErrorRequest } from "../../services/productService/productService";
import Alert from "../../components/alert";
import { handleSalesValueBewteen } from "../../services/saleService/SaleService";

const SellerDashboard = () => {

    const [clientName, setClientName] = useState<string>();
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [orders, setOrders] = useState<Page>();
    const [errorMessage, setErrorMessage] = useState('');
    const [sallesValue, setSallesValue] = useState('0');
    const [opensOrders, setOpenOrders] = useState('0');
    const [closeOrders, setCloseOrders] = useState('0');
    const [npage, setNpage] = useState(0)

    useEffect(() => {
        document.title = "Comandas - Vendedor";
    }, []);

    useEffect(() => {
        handeOpenOrders();
        handleOrdersOpenTotal();
        handleOrdersClosedTotal();
        handleSalesValueTotalBewteen();
    }, [showSuccessAlert])

    useEffect(() => {
        handleOpenOrders(npage).then((response) => setOrders(response))
    }, [npage])

    const handeOpenOrders = () => {
        handleOpenOrders(npage).then((response) => setOrders(response))
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleCreateOrder(clientName!).then(response => {
            if (response.status == 400) {
                const data = response.response as ErrorRequest
                handleAlert(false)
                setErrorMessage(data.message)
            } else {
                handleAlert(true)
            }
        })
    }

    const handleSalesValueTotalBewteen = () => {
        const today = new Date();

        const start = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        const end = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

        handleSalesValueBewteen(start, end).then(response => setSallesValue(response?.toLocaleString('pt-br',
            { style: 'currency', currency: 'BRL' }
        )));
    }

    const handleOrdersOpenTotal = () => {
        handleOpenOrdersTotal().then(response => setOpenOrders(response.total.toLocaleString()))
    }

    const handleOrdersClosedTotal = () => {
        handleClosedOrdersTotal().then(response => setCloseOrders(response.total.toLocaleString()))
    }

    const handleTotalValueToday = () => {

    }

    const handleAlert = (res: boolean) => {
        if (res) {
            setShowSuccessAlert(true)
            setTimeout(() => { setShowSuccessAlert(false) }, 2500)
        } else {
            setShowErrorAlert(true)
            setTimeout(() => { setShowErrorAlert(false) }, 2500)
        }
    }

    return (
        <div>
            <Navbar />
            {showSuccessAlert ? <Alert text="Comanda Cadastrada com sucesso!" type="success" icon="bi-check-circle-fill" /> : ''}
            {showErrorAlert ? <Alert text={errorMessage} type="danger" icon="bi-exclamation-circle-fill" /> : ''}
            <div className="row">
                <div className="col-2"></div>
                <div className="col-2 d-flex flex-column align-items-center">
                    <button className="btn btn-dark mt-5 mb-4" data-bs-toggle="modal" data-bs-target="#orderModal" style={
                        { width: '86%', height: '8vh' }
                    }>
                        <i className="bi bi-plus-square-fill"></i> Nova comanda
                    </button>
                    <MiniCard
                        width="100%"
                        header="Valor Total vendas"
                        title={sallesValue} />
                    <MiniCard
                        width="100%"
                        header="Comandas Abertas"
                        title={opensOrders} />
                    <MiniCard
                        width="100%"
                        header="Comandas Fechadas"
                        title={closeOrders} />
                </div>
                <div className="col-6">
                    <BigCard header="Comandas" width="100%">
                        <OrderList orders={orders} />
                    </BigCard>
                    <div className="btn-toolbar d-flex flex-column gap-3 align-items-center" role="toolbar" aria-label="Toolbar with button groups">
                        <div className="btn-group me-2" role="group" aria-label="Second group">
                            <button onClick={() => setNpage(npage - 1)} type="button" className={orders?.page.number! == 0 ? "btn btn-secondary disabled" : "btn btn-secondary"}>{'<'}</button>
                            <button className="btn btn-secondary disabled">{(orders?.page.number! + 1)}</button>
                            <button onClick={() => setNpage(npage + 1)} type="button" className={orders?.page.number! == orders?.page.totalPages! - 1 ? "btn btn-secondary disabled" : "btn btn-secondary"}>{'>'}</button>
                        </div>
                    </div>
                </div>
                <div className="col-2"></div>
            </div>

            <div className="modal fade" id="orderModal" aria-labelledby="orderModal" aria-hidden="true">
                <div className="modal-dialog">
                    <form className="modal-content" onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="orderModal">Nova comanda</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="text-light">
                                <Input label="Insira o nome do cliente" onBlur={() => { }} onChange={(v) => setClientName(v)} type="text" value={clientName!} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-dark" data-bs-dismiss="modal">Cadastrar comanda</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}


export default SellerDashboard;