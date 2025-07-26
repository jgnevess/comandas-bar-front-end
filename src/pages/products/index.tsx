import React, { useEffect, useState } from "react";
import { Page } from "../../models/Models";
import Navbar from "../../components/navbar";
import Container from "../../components/container";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "../../models/ProductModels";
import { handlePageAsync, handlePageAsyncWithParams } from "../../services/productService/productService";

const ProductPage = () => {

    const [page, setPage] = useState<Page>();
    const [status, setStatus] = useState<string>('all');
    const [npage, setNpage] = useState(0);

    useEffect(() => {
        document.title = "Comandas - Produtos";
    }, []);

    useEffect(() => {
        handleRequest();
    }, [npage])

    const handleRequest = () => {
        if (status === 'all') {
            handlePageAsync(npage, Math.floor(window.innerHeight / 100) + 1).then(response => setPage(response));
        } else {
            handlePageAsyncWithParams(npage, Math.floor(window.innerHeight / 100) + 1, status!).then(response => setPage(response));
        }
    }

    const Response = page?.content.map((product: Product, key) => {
        return (
            <tr key={product.id}>
                <td className="text-center">{product.code}</td>
                <td className="text-center">{product.description}</td>
                <td className="text-center">{product.costPrice.toLocaleString('PT-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td className="text-center">{product.quantity}</td>
                <td className="">
                    <Link className="btn btn-dark" to={`/product/${product.id}`}><i className="bi bi-card-text"></i></Link>
                </td>
            </tr>
        )
    })

    return (
        <>
            <Navbar />
            <Container>
                <>
                    <div className="d-flex my-4 justify-content-between w-50">
                        <Link to="/admin" className="btn btn-dark">Dashboard</Link>
                        <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <i className="bi bi-filter"></i> Filtrar
                        </button>

                    </div>
                    <table className="table table-dark table-striped w-50">
                        <thead>
                            <tr>
                                <th className="text-center" scope="col">Código</th>
                                <th className="text-center" scope="col">Descrição</th>
                                <th className="text-center" scope="col">Preço</th>
                                <th className="text-center" scope="col">Quantidade</th>
                                <th className="text-center" scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Response}
                        </tbody>
                    </table>
                    <div className="btn-toolbar d-flex flex-column gap-3" role="toolbar" aria-label="Toolbar with button groups">
                        <div className="btn-group me-2" role="group" aria-label="Second group">
                            <button onClick={() => setNpage(npage - 1)} type="button" className={page?.page.number! == 0 ? "btn btn-secondary disabled" : "btn btn-secondary"}>{'<'}</button>
                            <button className="btn btn-secondary disabled">{(page?.page.number! + 1)}</button>
                            <button onClick={() => setNpage(npage + 1)} type="button" className={page?.page.number! == page?.page.totalPages! - 1 ? "btn btn-secondary disabled" : "btn btn-secondary"}>{'>'}</button>
                        </div>
                    </div>

                    <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Filtrar produtos</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body text-light">
                                    <div className="form-check">
                                        <input onChange={(e) => setStatus(e.target.value)} className="form-check-input" type="radio" name="filter" id="all" value="all" checked={status === "all"} />
                                        <label className="form-check-label" htmlFor="all">
                                            Todos
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input onChange={(e) => setStatus(e.target.value)} className="form-check-input" type="radio" name="filter" id="active" value="active" checked={status === "active"} />
                                        <label className="form-check-label" htmlFor="active">
                                            Ativos
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input onChange={(e) => setStatus(e.target.value)} className="form-check-input" type="radio" name="filter" id="inactive" value="inactive" checked={status === "inactive"} />
                                        <label className="form-check-label" htmlFor="inactive">
                                            Inativos
                                        </label>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    <button onClick={handleRequest} type="button" className="btn btn-dark" data-bs-dismiss="modal"><i className="bi bi-filter"></i> Filtrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </Container>
        </>

    )
}

export default ProductPage