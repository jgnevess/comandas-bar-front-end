import axios, { AxiosError } from "axios"
import { ErrorRequest } from "../productService/productService"
import { data } from "react-router-dom"

const apiUrl = process.env.REACT_APP_API_URL

const headers = {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
}

export interface Bar {
    barName: string
    address: Address
}

export interface Address {
    streetName: string
    streetNumber: string
}

export interface Response {
    response: Bar | ErrorRequest
    status: number
}


const handleRequestBar = async (barId: number): Promise<Response> => {
    try {
        const response = await axios.get(`${apiUrl}/bar`, {
            headers: headers,
            params: {
                id: barId
            }
        })
        return { status: response.status,  response: response.data }
    } catch (error) {
        const err = error as AxiosError;
        const data = err.response?.data as { status: number, message: string }
        return { status: data.status, response: data }
    }
}

export { handleRequestBar }