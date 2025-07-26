import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BigCard from "../../components/bigcard";
import ProductDetailsForm from "../../components/productDetailsForm";
import Navbar from "../../components/navbar";
import Container from "../../components/container";
import Alert from "../../components/alert";

const ProductDetails = () => {

    const { id } = useParams();
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        document.title = "Comandas - Produtos";
    }, []);

    const handleAlert = (res: boolean, message: string) => {
        if (res) {
            setShowSuccessAlert(true)
            setTimeout(() => { setShowSuccessAlert(false) }, 2500)
        } else {
            setShowErrorAlert(true)
            setErrorMessage(message)
            setTimeout(() => { setShowErrorAlert(false) }, 2500)
        }
    }

    return (
        <>
            <Navbar />
            <Container>
                <>
                    {showSuccessAlert ? <Alert icon="bi-check-circle-fill" text="Produto atualizado com sucesso!" type="success" /> : ''}
                    {showErrorAlert ? <Alert icon="bi-exclamation-circle-fill" text={errorMessage} type="danger" /> : ''}
                    <BigCard header="Detalhes do produto">
                        <ProductDetailsForm btnMessage="Atualizar" id={id} onHandleAlert={(res, message) => handleAlert(res, message!)} />
                    </BigCard>
                </>
            </Container>
        </>
    )
}

export default ProductDetails;