import { link } from "fs";
import React, { JSX } from "react";
import { Link } from "react-router-dom";

interface Props {
    header: string
    link?: string
    children?: JSX.Element
    totalSale?: number
    width?: string
}

const BigCard = ({ header, link, children, totalSale, width }: Props) => {
    return (
        link ? 
        <Link className="nav nav-link text-center" to={`${link}`} style={{ width: width }}>
            <div className="card text-bg-dark">
                <div className={totalSale ? "card-header d-flex justify-content-between" : "card-header"}>
                    <h5 className="card-title">{header}</h5>
                    {totalSale == null || totalSale == 0 ? '' : <h5 className="card-title">
                        {totalSale.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}
                    </h5>}
                </div>
                <div className="card-body">
                    {children}
                </div>
            </div>
        </Link> : 
        <div className="nav nav-link text-center" style={{ width: width }}>
            <div className="card text-bg-dark">
                <div className={totalSale ? "card-header d-flex justify-content-between" : "card-header"}>
                    <h5 className="card-title">{header}</h5>
                    {totalSale == null || totalSale == 0 ? '' : <h5 className="card-title">
                        {totalSale.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}
                    </h5>}
                </div>
                <div className="card-body">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default BigCard;