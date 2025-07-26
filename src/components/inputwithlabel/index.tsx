import React, { ChangeEvent } from "react";
interface InputProps {
    label: string
    type: HTMLInputElement['type']
    value: string
    onChange: (value: string) => void
    onBlur: (value: string) => void
    classname?: {status: boolean | null, classname: string}
    disabled?: boolean
}


const Input = (props: InputProps) => {
    return(
        <div className="d-flex flex-column justity-content-center align-items-center w-100 my-4">
            <label className="form-label w-75 fw-bold">{props.label}</label>
            <input 
                className={
                    props.classname?.status == true ?
                    props.classname.classname : props.classname?.status == false ? 'form-control is-valid w-75 py-2 rounded bg-dark text-light' :
                    "form-control w-75 py-2 rounded bg-dark text-light"
                } 
                value={props.value} type={props.type} 
                onChange={e => props.onChange(e.target.value)}
                onBlur={e => props.onBlur(e.target.value)}
                disabled={props.disabled}/>
        </div>
    )
}

export default Input;