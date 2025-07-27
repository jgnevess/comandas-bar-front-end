import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Container from "../../components/container";
import BigCard from "../../components/bigcard";
import Saletable from "../../components/saletable";
import { Page, Sale } from "../../models/Models";
import MiniCard from "../../components/minicard";
import { useNavigate } from "react-router-dom";
import { handleSales, handleSalesValue, handleSalesValueBewteen } from "../../services/saleService/SaleService";

const SalePage = () => {

    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const [sales, SetSales] = useState<Page>()
    const [totalSales, setTotalSales] = useState('0')
    const [totalSalesUn, setTotalSalesUn] = useState('0');

    useEffect(() => {

        const today = new Date();

        const start = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-01`;
        const end = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

        setStartDate(start);
        setEndDate(end);

        handleSalesValueBewteen(start, end)
            .then(response => {
                if (response) {
                    setTotalSales(response.toLocaleString("pt-br", { style: "currency", currency: "BRL" }))
                }
            })

        handleSales(start, end, sales?.page.number == undefined
            ? 0
            : sales?.page.number!).then((response) => {
            if (response.status == 200) {
                const data = response.response as Page
                SetSales(data);
                setTotalSalesUn(data.page.totalElements.toLocaleString())
            }
        });
        document.title = "Comandas - Vendas";
    }, []);

    const handleSalesRequest = () => {
        handleSales(startDate!, endDate!, sales?.page.number == undefined ? 0 : sales?.page.number!).then((response) => {
            if (response.status == 200) {
                const data = response.response as Page
                SetSales(data);
                setTotalSales(data.content.reduce((acc, e: Sale) => acc + e.totalPrice, 0).toLocaleString("pt-br", { style: "currency", currency: "BRL" }))
                setTotalSalesUn(data.page.totalElements.toLocaleString())
            }
        });

        handleSalesValueBewteen(startDate!, endDate!)
            .then(response => {
                if (response) {
                    setTotalSales(response.toLocaleString("pt-br", { style: "currency", currency: "BRL" }))
                }
            })
    }

    const handleSalesPlus = () => {
        handleSales(startDate!, endDate!, sales?.page.number! + 1).then((response) => {
            if (response.status == 200) {
                const data = response.response as Page
                SetSales(data);
                setTotalSalesUn(data.page.totalElements.toLocaleString())
            }
        });
    }

    const handleSalesMinus = () => {
        handleSales(startDate!, endDate!, sales?.page.number! - 1).then((response) => {
            if (response.status == 200) {
                const data = response.response as Page
                SetSales(data);
                setTotalSalesUn(data.page.totalElements.toLocaleString())
            }
        });
    }

    return (
        <>
            <Navbar />
            <div className="d-flex w-100 mt-2 justify-content-center">
                <div className="row w-50">
                    <div className="col-3">
                        <label htmlFor="startdate">Inicio</label>
                        <input type="date" id="startdate" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div className="col-3">
                        <label htmlFor="enddate">Fim</label>
                        <input type="date" id="enddate" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                    <div className="col-3 justify-content-center">
                        <button onClick={handleSalesRequest} className="btn btn-dark mt-4 w-100">Buscar</button>
                    </div>
                    <div className="col-3 justify-content-center">
                        <button onClick={() => window.open(`/report?start=${startDate}&end=${endDate}`, '_blank')} className="btn btn-dark mt-4 w-100">Imprimir</button>
                    </div>
                </div>
            </div>
            <Container>
                <>
                    <div className="w-100 d-flex justify-content-center">
                        <MiniCard header="Valor total de vendas no período" title={totalSales} />
                        <MiniCard header="Total de pedidos no período" title={totalSalesUn} />
                    </div>
                    <BigCard header="Vendas" width="50%">
                        <Saletable sales={sales?.content!} />
                    </BigCard>
                    <div className="btn-toolbar d-flex flex-column gap-3" role="toolbar" aria-label="Toolbar with button groups">
                        <div className="btn-group me-2" role="group" aria-label="Second group">
                            <button onClick={handleSalesMinus} type="button" className={sales?.page.number! == 0 ? "btn btn-secondary disabled" : "btn btn-secondary"}>{'<'}</button>
                            <button className="btn btn-secondary disabled">{(sales?.page.number! + 1)}</button>
                            <button onClick={handleSalesPlus} type="button" className={sales?.page.number! == sales?.page.totalPages! - 1 ? "btn btn-secondary disabled" : "btn btn-secondary"}>{'>'}</button>
                        </div>
                    </div>
                </>
            </Container>
        </>
    )
}

export default SalePage;