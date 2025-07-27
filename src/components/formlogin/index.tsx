import React, { useState } from "react";
import Input from "../inputwithlabel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { handleLoginRequest, handleValidToken } from "../../services/authservice/authservice";
import { LoginResponse } from "../../models/Models";

const FormLogin = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const [usernameNotEmpty, setUsernameNotEmpty] = useState<boolean | null>(null)
    const [passNotEmpty, setPasswordNotEmpty] = useState<boolean | null>(null)
    const [loginError, setLoginError] = useState<boolean | null>(null)

    const handleAlert = (res: boolean) => {
        setLoginError(true)
        setTimeout(() => { setLoginError(false) }, 2500)
    }

    const handleBlur = (value: string) => {
        if (value.trim() !== '') {
            setUsernameNotEmpty(false)
        }
    }

    const handleBlurPass = (value: string) => {
        if (value.trim() !== '') {
            setPasswordNotEmpty(false)
        }
    }

    const handlerLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (username.trim() == '' || password.trim() == '') {
            setPasswordNotEmpty(true)
            setUsernameNotEmpty(true)
            handleAlert(true)
            setErrorMessage("Preencher os dados corretamente");
            return
        }
        handleLoginRequest(username, password).then(response => {
            if(response.status == 500) {
                localStorage.clear();
            }
            if(response.status == 200) {
                localStorage.setItem('token', response.token!)
                localStorage.setItem('barId', response.barId!)
                
                handleValidToken(response.token!).then(res => {
                    if(res.role === "ADMIN") window.location.href = '/admin'
                    if(res.role === "SELLER") window.location.href = '/seller'
                    if(res.role === "SUPER") window.location.href = '/register'
                })
                
            }
            else {
                localStorage.clear();
                setErrorMessage(response.message!)
                handleAlert(true)
            }
        })
    }

    return (
        <form onSubmit={handlerLogin} className="row w-100">
            <div className="col-7 d-flex flex-column justify-content-center align-items-center">
                <h1>Bem vindo de volta</h1>
                <p>Faça login para continuar gerenciando seus pedidos e vendas com agilidade e segurança</p>
            </div>
            <div className="col-5 d-flex flex-column justify-content-center align-items-center border rounded">
                <h2 className="fw-bold display-4">Login</h2>
                <Input
                    label="Username"
                    type="text" value={username}
                    onChange={setUsername}
                    onBlur={handleBlur}
                    classname={{ status: usernameNotEmpty, classname: 'form-control is-invalid w-75 py-2 rounded bg-dark text-light' }} />
                <Input
                    label="Senha"
                    type="password"
                    value={password}
                    onChange={setPassword}
                    onBlur={handleBlurPass}
                    classname={{ status: passNotEmpty, classname: 'form-control is-invalid w-75 py-2 rounded bg-dark text-light' }} />
                <button className="btn btn-dark w-75 mt-4 py-2">Entrar no sistema</button>
                {loginError ? <div
                    className="alert text-center alert-danger position-fixed top-0 start-50 translate-middle-x mt-3 z-3"
                    role="alert"
                    style={{ width: "400px" }}
                >
                    {errorMessage}
                </div> : ''}
            </div>
        </form>
    )
}

export default FormLogin;