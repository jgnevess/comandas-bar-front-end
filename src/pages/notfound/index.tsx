import React from "react";

const NotFound = () => {

    const handleNotFound = () => {
        window.location.href = '/'
    }

    return(
        <div className="d-flex flex-column justify-content-center align-items-center w-100">
            <h1 className="display-1 fw-bold">Página não encontrada</h1>
            <button className="btn btn-primary" onClick={handleNotFound}>Voltar ao dashboard</button>
        </div>
    )
}


export default NotFound;