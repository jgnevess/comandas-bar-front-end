import React, { JSX } from "react";
import { Sale } from "../../models/Models";
import { Link, useParams } from "react-router-dom";

interface Props {
    sales: []
    page?: string
}


const Saletable = ({ sales, page }: Props) => {
    const Response = sales?.map((sale: Sale) => {
        return (
            <tr key={sale.id}>
                <td>{sale.clientName}</td>
                <td>
                    {new Date(sale.saleDate).toLocaleString('pt-BR').split(",")[0]}
                </td>
                <td>{sale.totalPrice.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
                { 
                    page !== "admin" ?
                    <td><Link className="btn btn-dark" aria-current="page" to={`/sale/${sale.id}`}><i className="bi bi-card-text"></i></Link></td>
                    : ''
                }
            </tr>
        )
    })

    return (
        <table className="table table-dark table-striped w-100">
            <thead>
                <tr>
                    <th scope="col">Cliente</th>
                    <th scope="col">Data</th>
                    <th scope="col">Total</th>
                   { page != 'admin' ? <th scope="col">Detalhes</th> : ''}
                </tr>
            </thead>
            <tbody>
                {Response}
            </tbody>
        </table>
    )
}

export default Saletable;