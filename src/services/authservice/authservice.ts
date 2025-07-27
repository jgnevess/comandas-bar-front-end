import axios, { AxiosError } from "axios";
import { ErrorRequest } from "../productService/productService";
import { use } from "react";

const apiUrl = process.env.REACT_APP_API_URL

const headers = {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
}

export interface LoginResponse {
    token?: string
    useRole?: string
    status: number
    message?: string
    barId?: string
}

export interface TokenResponse {
    status?: number
    role?: string
    subject?: string
}

export interface UserRegister {
    username: string
    passwd: string
    role: string
}

export interface UserResponse {
    username: string
    role: string
}

export interface Response {
    response: UserResponse | ErrorRequest
    status: number
}

const handleLoginRequest = async (username: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axios.post(`${apiUrl}/auth/login`, {
            username: username,
            password: password
        });
        return { status: 200, token: response.data.token, useRole: response.data.userRole, barId: response.data.barId }
    } catch (err) {
        const error = err as AxiosError;

        if(!error.response) {
            return {
                status: 500,
                message: "Servidor indisponivel! Tente novamente mais tarde."
        };    
        }

        const data = error.response?.data as { message: string };
        return {
            status: error.status!,
            message: data.message!
        };
    }
}

const handleValidToken = async (token: string): Promise<TokenResponse> => {
    try {
        const response = await axios.get(`${apiUrl}/auth/valid`, {
            params: {
                token: token
            }
        })
        return response.data
    } catch (err) {
        const error = err as AxiosError

        if(!error.response) {
            localStorage.clear();
            return {
                status: 500
        };    
        }

        const data = error.response?.data as {status: number}
        return { status: data.status }
    }
}

const handleRegisterUser = async (user: UserRegister): Promise<Response> => {
    try {
        const response = await axios.post<UserResponse>(`${apiUrl}/auth/register`, user, {
            headers: headers
        })
        return {status: response.status, response: response.data}
    } catch (error) {
        const err = error as AxiosError;
        const data = err.response?.data as { status: number, message: string }
        return {status: data.status, response: {message: data.message}}
    }
}

export { handleLoginRequest, handleValidToken, handleRegisterUser }