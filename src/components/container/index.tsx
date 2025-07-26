import React, { JSX } from "react";
import Navbar from "../navbar";

interface Props {
    children: JSX.Element
}

const Container = ({ children }: Props) => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{
                minHeight: "80vh"
            }}>
            {children}
        </div>
    )
}


export default Container
