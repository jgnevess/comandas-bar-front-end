import React from "react";
import { text } from "stream/consumers";

interface Props {
    text: string
    type: 'success' | 'danger'
    icon: 'bi-check-circle-fill' | 'bi-exclamation-circle-fill'
}

const Alert = ({ text, type, icon }: Props) => (
    type == 'success' ? <div
        className="alert text-center alert-success position-fixed top-0 start-50 translate-middle-x mt-3 z-3"
        role="alert"
        style={{ width: "400px" }}
    >
        <i className={`bi ${icon} me-4`}></i> {text}
    </div> : <div
        className="alert alert-danger d-flex align-items-center position-fixed top-0 start-50 translate-middle-x mt-3 z-3"
        role="alert"
        style={{ width: "400px" }}
    >
        <i className={`bi ${icon} me-4`}></i> {text}
    </div>
)

export default Alert;