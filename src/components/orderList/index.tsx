import React, { JSX } from "react";
import { Page, Sale } from "../../models/Models";
import { Link } from "react-router-dom";

interface Props {
    orders?: Page
}

const OrderList = ({ orders }: Props) => {

    const Response = orders?.content.map((order: Sale) => {
            return (
                <tr key={order.id}>
                    <td>{order.clientName}</td>
                    <td>
                        {order.totalPrice.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}
                    </td>
                    <td>
                        <Link  
                            className="btn btn-dark"
                            to={`/order/${order.id}`}
                            ><i className="bi bi-card-text"></i></Link>
                    </td>
                </tr>
            )
        })

    return (
        <table className="table table-dark">
            <thead>
                <tr>
                    <th scope="col">Cliente</th>
                    <th scope="col">Total</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                { Response }
            </tbody>
        </table>
    )
}

export default OrderList