import React, { useContext, useEffect } from "react";
import FormLogin from "../../components/formlogin";


const LoginPage = () => {

    useEffect(() => {
        document.title = "Comandas - Login";
    }, []);

    return (
        <div className="d-flex w-100 p-5 min-vh-100">
            <FormLogin />
        </div>
    )
}

export default LoginPage;