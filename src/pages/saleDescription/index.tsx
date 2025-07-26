import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../../components/container";
import { handleSaleByid } from "../../services/saleService/SaleService";
import { Sale, SaleDetais } from "../../models/Models";
import { ErrorRequest } from "../../services/productService/productService";
import Navbar from "../../components/navbar";

const SaleDescription = () => {

    const navigate = useNavigate()
    const param = useParams()
    const [sale, setSale] = useState<SaleDetais>()
    const [reload, setReload] = useState(false)

    useEffect(() => {
        document.title = "Comandas - Vendas";
    }, []);

    useEffect(() => {
        handleGetSale()
        console.log(sale)
        setReload(true)
    }, [reload])

    const handleGetSale = () => {
        if (!param.id) return;
        handleSaleByid(param.id).then(response => {
            if (response.status == 200) {
                const data = response.response as SaleDetais
                setSale(data)
            } else {
                const data = response.response as ErrorRequest
                // TODO: TRATAR ESSA PORRA
            }
        })
        setReload(false)
    }

    const handlePdf = () => {

    }

    const Items = sale?.order.items.map((i, k) => {
        return (
            <li key={k} className="list-group-item bg-dark text-light">
                <div className="d-flex justify-content-between py-1">
                    <span className="w-50">{i.productName}</span>
                    <span className="w-25 text-center">{i.quantity}</span>
                    <span className="w-25 text-end">{(i.unitPrice).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                    <span className="w-25 text-end">{(i.unitPrice * i.quantity).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                </div>
            </li>
        )
    })

    return (
        <>
            <Navbar />
            <Container>
                <>
                    <div className="card text-light w-50">
                        <div className="d-flex justify-content-between">
                            <h5 className="card-header">Cliente: {sale?.order.clientName}</h5>
                            <h5 className="card-header">Pagamento: {sale?.order.paymentType}</h5>
                            <h5 className="card-header">{sale?.order.totalPrice
                                .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h5>
                        </div>
                        <div className="card-body py-3">
                            <h4>Produtos</h4>
                            <ul className="list-group list-group-flush gap-1">
                                <li className="list-group-item bg-dark text-light">
                                    <div className="d-flex fw-bold justify-content-between py-1">
                                        <span className="w-50">Descrição</span>
                                        <span className="w-25 text-center">Quantidade</span>
                                        <span className="w-25 text-end">Preço unitario</span>
                                        <span className="w-25 text-end">Total</span>
                                    </div>
                                </li>
                                {Items}
                            </ul>
                            <div className="d-flex justify-content-between align-items-center">
                                <button onClick={() => navigate('/sales')} className="btn btn-dark mt-3">Voltar</button>
                                <span className="w-25">{new Date(sale?.order.orderDateTime!).toLocaleString('pt-BR').split("T")[0].replace(",", "")}</span>
                                <span className="w-25">Status: {sale?.order.status}</span>
                                <button onClick={() => window.open(`/pdf/${param.id}`, '_blank')} className="btn btn-dark mt-3">Imprimir <i className="bi bi-printer"></i></button>
                            </div>
                        </div>
                    </div>
                </>
            </Container>
        </>
    )

}

export default SaleDescription;