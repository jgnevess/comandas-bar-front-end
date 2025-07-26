import React from "react";
import { Link } from "react-router-dom";

interface Props {
    header: string
    title: number | string
    link?: string
    width?: string
}

const MiniCard = ({ header, title, link, width }: Props) => {
    return (
        link ?  
        <Link className="nav nav-link text-center" to={`${link}`} style={{width: width}}>
            <div className="card text-bg-dark mb-3" style={{minHeight: '20vh'}} >
                <div className="card-header fw-bold d-flex justify-content-center align-items-center" style={{minHeight: '10vh'}}>
                    <h5 className="card-title fw-bold">{header}</h5>
                </div>
                <div className="card-body" style={{minHeight: '10vh'}}>
                    <h3 className="card-title fw-bold">{title}</h3>
                </div>
            </div>
        </Link>
        : <div className="nav nav-link text-center" style={{width: width}}>
            <div className="card text-bg-dark mb-3" style={{minHeight: '20vh'}} >
                <div className="card-header fw-bold d-flex align-items-center" style={{minHeight: '10vh'}}>
                    <h5 className="card-title fw-bold">{header}</h5>
                </div>
                <div className="card-body" style={{minHeight: '10vh'}}>
                    <h3 className="card-title fw-bold">{title}</h3>
                </div>
            </div>
        </div>
    )
}

export default MiniCard;