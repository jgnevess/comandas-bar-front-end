import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { handleUserServiceNavbar } from "../../services/authservice/handleUserService";

export type PropsNavbar = {
    links: Link
}

interface Link {
    route: string,
    title: string
}


const Navbar = () => {

    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        handleUserServiceNavbar().then(response => {
            setAdmin(response)
        })
    })

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/redirect'
    }

    const linksAdmin = [
        { route: '/seller', title: 'Dashboard Vendas' },
        { route: '/products', title: 'Produtos' },
        { route: '/sales', title: 'Vendas' },
    ]

    const Links = admin ? linksAdmin.map((l, k) => {
        return (
            <li key={k} className="nav-item">
                <Link className="nav-link text-light py-2 my-2" aria-current="page" to={l.route}>{l.title}</Link>
            </li>
        )
    }) :

        ''

    return (
        <>
            <div className="d-flex">
                <button className="btn btn-dark my-3 mx-5 position-fixed top-0 start-0 translate-middle-x z-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"><i className="bi bi-list"></i></button>
            </div>

            <div className="offcanvas offcanvas-start bg-dark text-light" data-bs-scroll="true" data-bs-backdrop="false" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="staticBackdropLabel">Comanda</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="d-flex flex-column justify-content-between" style={{
                        height: "88vh"
                    }}>
                        <div>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <Link className="nav-link text-light py-2 my-2" to="/admin">Dashboard</Link>
                                {Links}
                            </ul>
                        </div>
                        <div>
                            <button onClick={handleLogout} className="nav-link text-light w-100">Sair</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Navbar;