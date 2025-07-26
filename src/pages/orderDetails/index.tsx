import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BigCard from "../../components/bigcard";
import { deleteOrder, handleAddItemQuantity, handleCloserOrderService, handleDeleteItem, handleInsertItem, handleOrderById, handleRemoveItemQuantity } from "../../services/orderService/orderService";
import { Order, Sale, SaleDetais } from "../../models/Models";
import Container from "../../components/container";
import Navbar from "../../components/navbar";
import { ErrorRequest, handleActiveList, handleFindByDescription, handleProductsTotal, ProductSelected } from "../../services/productService/productService";
import Alert from "../../components/alert";

interface PaymentType {
    condition: string
    ENUM: string
}

interface OrderItem {
    productId: number
    productName: string
    quantity: number
    unitPrice: number
}

const OrderDetais = () => {

    const paymentTypes: PaymentType[] = [{ condition: 'Dinheiro', ENUM: 'DINHEIRO' }, { condition: 'Pix', ENUM: 'PIX' }, { condition: 'Credito', ENUM: 'CREDITO' }, { condition: 'Debito', ENUM: 'DEBITO' }]

    const param = useParams();
    const [order, setOrder] = useState<Order>();
    const [loadError, setLoadError] = useState(false);
    const [paymentType, setPaymentType] = useState<string>();
    const [productList, setProductList] = useState<ProductSelected[]>([]);
    const [productId, setProductId] = useState<string>()
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [state, setState] = useState(false)
    const [productDescription, setProductDescription] = useState('');

    const navigate = useNavigate();

    useEffect(() => {

        
        handleOrderById(param.id!).then(response => {
            if (response.status != 200) {
                setLoadError(true)
                setTimeout(() => { setLoadError(true) }, 3000)
            }
            else {
                const data = response.response as Order
                document.title = `Comandas - ${data.clientName}`;
                setOrder(data)
            }
        });
        
        if(productDescription?.trim() === '') {
            handleActiveList().then(response => setProductList(response));
        }
        
        setState(false)
    }, [state])

    const handleDeleteOrder = () => {
        deleteOrder(param.id!).then(() => {
            navigate('/seller')
        });
    }

    const handleAddItem = () => {
        if (productId == undefined) {
            setErrorMessage("Selecione um produto")
            setShowErrorAlert(true)
            setTimeout(() => setShowErrorAlert(false), 2500);
        } else {
            handleInsertItem(param.id!, productId).then(response => {
                if (response.status == 404) {
                    setErrorMessage("Erro ao adicionar produto")
                    setShowErrorAlert(true)
                    setTimeout(() => setShowErrorAlert(false), 2500);
                }
                else if (response.status == 500) {
                    const err = response.response as ErrorRequest
                    setErrorMessage(err.message)
                    setShowErrorAlert(true)
                    setTimeout(() => setShowErrorAlert(false), 2500);
                }
                else {
                    setState(true)
                    setSuccessMessage("Produto adicionado")
                    setShowSuccessAlert(true)
                    setTimeout(() => setShowSuccessAlert(false), 2500);
                    
                    setState(true)
                }
            })
        }
        setProductDescription('')
    }

    const handleAddQuantity = (id: number) => {
        handleAddItemQuantity(param.id!, id.toLocaleString()).then(response => {
            if (response.status === 404) {
                const err = response.response as ErrorRequest
                setErrorMessage(err.message)
                setShowErrorAlert(true)
                setTimeout(() => setShowErrorAlert(false), 2500);
            } else if (response.status == 500) {
                const err = response.response as ErrorRequest
                setErrorMessage(err.message)
                setShowErrorAlert(true)
                setTimeout(() => setShowErrorAlert(false), 2500);
            }
            
            setState(true)
        })
    }

    const handleRemoveQuantity = (id: number) => {
        handleRemoveItemQuantity(param.id!, id.toLocaleString()).then(response => {
            if (response.status === 404) {
                const err = response.response as ErrorRequest
                setErrorMessage(err.message)
                setShowErrorAlert(true)
                setTimeout(() => setShowErrorAlert(false), 2500);
            }
            
            setState(true)
        })
    }

    const handleDelete = (id: number) => {
        handleDeleteItem(param.id!, id.toLocaleString()).then(response => {
            if (response.status === 404) {
                const err = response.response as ErrorRequest
                setErrorMessage(err.message)
                setShowErrorAlert(true)
                setTimeout(() => setShowErrorAlert(false), 2500);
            }
            else if (response.status == 500) {
                const err = response.response as ErrorRequest
                setErrorMessage(err.message)
                setShowErrorAlert(true)
                setTimeout(() => setShowErrorAlert(false), 2500);
            }
            else {
                setSuccessMessage("Produto Deletado com sucesso")
                setShowSuccessAlert(true)
                setTimeout(() => setShowSuccessAlert(false), 2500);
                
                setState(true)
            }
        })
    }

    const handleCloseOrder = () => {
        handleCloserOrderService(param.id!, paymentType!).then(response => {
            if (response.status == 404) {
                const err = response.response as ErrorRequest
                setErrorMessage(err.message)
                setShowErrorAlert(true)
                setTimeout(() => setShowErrorAlert(false), 2500);
            } else {
                const data = response.response as Sale
                window.open(`/pdf/${data.id}`, '_blank')
                navigate('/seller')
            }
        })
    }

    const handleSearch = (value: string) => {
        setProductDescription(value)
        handleFindByDescription(value).then(response => {
            setProductList(response)
        })
        
        setState(true)
    }

    const PaymentTypes = paymentTypes.map((v, k) => {
        return (
            <option key={k} value={v.ENUM}>{v.condition}</option>
        )
    })

    const Products = productList!.map((v, k) => {
        return (
            <option key={k} value={v.id}>{v.description}</option>
        )
    })

    const Items = order?.items.map((v: OrderItem, k) => {
        return (
            <li key={k} className="bg-dark text-light list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{v.productName}</div>
                </div>
                <div className="w-50 d-flex justify-content-between py-1">
                    <div className="w-50 d-flex justify-content-evenly align-items-center">
                        {v.quantity == 1 ? <button onClick={() => handleDelete(v.productId)} className="btn btn-outline-danger"><i className="bi bi-trash"></i></button> :
                            <button onClick={() => handleRemoveQuantity(v.productId)} className="btn btn-dark"><i className="bi bi-dash"></i></button>
                        }
                        <span>{v.quantity}</span>
                        <button onClick={() => handleAddQuantity(v.productId)} className="btn btn-dark"><i className="bi bi-plus"></i></button>
                    </div>
                    <div>
                        <span>{(v.unitPrice * v.quantity).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                    </div>
                </div>
            </li>
        )
    })


    return (
        <Container>
            <>
                {showSuccessAlert ? <Alert icon="bi-check-circle-fill" text={successMessage} type="success" /> : ''}
                {showErrorAlert ? <Alert icon="bi-exclamation-circle-fill" text={errorMessage} type="danger" /> : ''}
                <Navbar />
                {loadError ?
                    <>
                        <h1 className="mb-5"> Comanda não encontrada</h1>
                        <div className="mb-5 d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        <Link to={'/seller'}>Voltar ao Dashboard</Link>
                    </>
                    : <BigCard header={order?.clientName!} totalSale={order?.totalPrice} width="50%">
                        <>
                            <div className="row p-1 border-bottom mb-2">
                                <div className="col-6">
                                    <select onChange={(e) => setProductId(e.target.value)} value={productId} className="form-select form-select">
                                        <option selected disabled>Adicionar produto</option>
                                        {Products}
                                    </select>
                                </div>
                                <div className="col-6">
                                    <button className="btn btn-dark" type="button" data-bs-toggle="collapse" data-bs-target="#serchColapse" aria-expanded="false" aria-controls="serchColapse"><i className="bi bi-search"></i></button>
                                    <button onClick={handleAddItem} className="btn btn-dark">Adicionar produto</button>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="collapse multi-collapse" id="serchColapse">
                                            <div className="card card-body">
                                                <input
                                                    className="bg-dark text-light"
                                                    placeholder="Digite a descrição do produto"
                                                    type="text"
                                                    id="Product"
                                                    value={productDescription}
                                                    onChange={(e) => handleSearch(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-dark text-light list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Descrição</div>
                                </div>
                                <div className="w-50 d-flex justify-content-between py-1">
                                    <span className="fw-bold">Quantidade</span>
                                    <span className="fw-bold">Preço</span>
                                </div>
                            </div>
                            <div className="row" style={{ height: '60vh', overflow: 'auto' }}>
                                <ol className="list-group list-group-numbered">
                                    {Items}
                                </ol>
                            </div>
                            <div className="row">
                                <div className="col-6 p-3">{new Date(order?.orderDateTime!).toLocaleString('pt-BR').split(",")}</div>
                                <div className="col-6 p-3">
                                    <select onChange={(e) => setPaymentType(e.target.value)} value={paymentType} className="form-select form-select-sm">
                                        <option selected disabled>Forma de pagamento</option>
                                        {PaymentTypes}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <button onClick={() => navigate('/seller')} className="btn btn-dark">Voltar</button>
                                </div>
                                <div className="col-4">
                                    <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">Cancelar comanda</button>
                                </div>
                                <div className="col-4">
                                    <button disabled={!paymentTypes.some(p => p.ENUM === paymentType)} onClick={handleCloseOrder} className="btn btn-dark">Finalizar</button>
                                </div>
                            </div>
                        </>
                    </BigCard>}
                <div className="modal" id="deleteModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body text-light">
                                <p>Não será possivel recuperar a comanda excluída!</p>
                                <p>Deseja continuar?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Não</button>
                                <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal" onClick={handleDeleteOrder}>Sim</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </Container>
    )
}

export default OrderDetais