import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/container";
import Input from "../../components/inputwithlabel";
import Alert from "../../components/alert";
import { handleRegisterUser, UserRegister, UserResponse } from "../../services/authservice/authservice";
import { ErrorRequest } from "../../services/productService/productService";

const RegisterPage = () => {

    const [username, setUsername] = useState('')
    const [passwd, setPasswd] = useState('')
    const [confirmPasswd, setConfirmPasswd] = useState('')
    const [role, setRole] = useState('')
    const [errorAlert, setErrorAlert] = useState(false)
    const [errorMsg, setErrorMsg] = useState('');
    const [successAlert, setSuccessAlert] = useState(false)
    const [successMsg, setSuccessMsg] = useState('');

    const roles = [
        { role: 'ADMIN', description: 'Administrador' },
        { role: 'SUPER', description: 'Administrador do sistema' },
        { role: 'SELLER', description: 'Vendedor' }
    ]

    useEffect(() => {
        document.title = "Comandas - Registrar";
    }, []);

    const Roles = roles.map((r, k) => {
        return (<option value={r.role}>{r.description}</option>)
    })

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/redirect'
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (username.trim() === '' || passwd.trim() === '' || role.trim() === '') {
            setErrorAlert(true)
            setErrorMsg('Preencher todos os campos');
            setTimeout(() => { setErrorAlert(false) }, 2500)
        }
        else if (passwd !== confirmPasswd) {
            setErrorAlert(true)
            setErrorMsg('As senhas são diferentes');
            setTimeout(() => { setErrorAlert(false) }, 2500)
        }
        else {
            const user = { username, passwd, role } as UserRegister;
            handleRegisterUser(user).then(response => {
                if (response.status !== 201) {
                    const data = response.response as ErrorRequest
                    setErrorAlert(true)
                    setErrorMsg(data.message);;
                    setTimeout(() => { setErrorAlert(false) }, 2500)
                } else {
                    const data = response.response as UserResponse
                    setSuccessAlert(true)
                    setSuccessMsg(`usuário: ${data.username} - ${data.role}`)
                    setUsername('')
                    setPasswd('')
                    setConfirmPasswd('')
                    setRole('')
                    setTimeout(() => { setSuccessAlert(false) }, 2500)
                }
            })
        }
    }

    return (
        <Container>
            <>
                {errorAlert ? <Alert text={errorMsg} icon="bi-exclamation-circle-fill" type="danger" /> : ''}
                {successAlert ? <Alert text={successMsg} icon="bi-check-circle-fill" type="success" /> : ''}
                <form onSubmit={handleSubmit}
                    className="w-75 d-flex flex-column align-items-center p-5">
                    <Input label="Username"
                        onBlur={() => { }}
                        onChange={setUsername}
                        type="text"
                        value={username} />
                    <Input label="Senha"
                        onBlur={() => { }}
                        onChange={setPasswd}
                        type="password"
                        value={passwd} />
                    <Input label="Confirmar a Senha"
                        onBlur={() => { }}
                        onChange={setConfirmPasswd}
                        type="password"
                        value={confirmPasswd} />
                    <div className="row w-75 justify-content-center">
                        <div className="col-6 d-flex justify-content-start">
                            <select onChange={(e) => setRole(e.target.value)} value={role} className="form-select form-select-sm">
                                <option value='' selected disabled>Role</option>
                                {Roles}
                            </select>
                        </div>
                        <div className="col-6 d-flex justify-content-end gap-2">
                            <button type="button" onClick={handleLogout} className="btn btn-dark">Sair</button>
                            <button type="submit" className="btn btn-dark">Cadastrar</button>
                        </div>
                    </div>
                </form>
            </>
        </Container>
    )
}

export default RegisterPage;