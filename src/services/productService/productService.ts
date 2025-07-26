import axios, { AxiosError } from "axios"
import { ProductCreate, ProductUpdate, ProductCreated } from "../../models/ProductModels"
import { Page } from "../../models/Models"

const apiUrl = process.env.REACT_APP_API_URL

const headers = {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
}

const pageSize = Math.floor((window.innerHeight / 100) / 2);


export interface Response {
    response: ProductCreated | ErrorRequest
    status: number
}

export interface ErrorRequest {
    message: string
}

export interface ProductSelected {
    id: number,
    description: string
}

const handleFastActive = async (id: string): Promise<Response> => {
    try {
        const response = await axios.patch(`${apiUrl}/product/fast-active/${id}`, null, {
            headers: headers
        });
        return { response: response.data, status: response.status };
    } catch (error) {
        const err = error as AxiosError;
        const data = err.response?.data as { status: number, message: string }
        return { status: data.status, response: data }
    }
}

const handleupdateProduct = async (id: string, productCreate: ProductUpdate): Promise<Response> => {
    try {
        const response = await axios.put<ProductCreated>(`${apiUrl}/product/update/${id}`, productCreate, {
            headers: headers
        });
        return { response: response.data, status: response.status };
    } catch (error) {
        const err = error as AxiosError;
        const data = err.response?.data as { status: number, message: string }
        return { status: data.status, response: data }
    }
}

const handleAddProducts = async (id: string, quantity: string): Promise<Response> => {
    try {
        quantity = quantity.replace(".", "");
        const response = await axios.patch<ProductCreated>(`${apiUrl}/product/add/${id}?quantity=${quantity}`, null, {
            headers: headers,
        });
        return { response: response.data, status: response.status };
    } catch (error) {
        const err = error as AxiosError;
        const data = err.response?.data as { status: number, message: string }
        return { status: data.status, response: data }

    }
}

const handleCreateProductService = async (productCreate: ProductCreate): Promise<Response> => {
    try {
        const response = await axios.post<ProductCreated>(`${apiUrl}/product`, productCreate, {
            headers: headers
        });
        return { response: response.data, status: response.status };
    } catch (error) {
        const err = error as AxiosError;
        const data = err.response?.data as { status: number, message: string }
        return { status: data.status, response: data }

    }
}

const handleFindById = async (id: string): Promise<Response> => {
    try {
        const response = await axios.get<ProductCreated>(`${apiUrl}/product/${id}`, {
            headers: headers
        });
        return { response: response.data, status: response.status };
    } catch (error) {
        const err = error as AxiosError;
        const data = err.response?.data as { status: number, message: string }
        return { status: data.status, response: data }

    }
}

const handlePageAsync = async (page: number, pageSize: number): Promise<Page | undefined> => {
    try {
        const response = await axios.get<Page>(`${apiUrl}/product`, ({
            params: {
                page: page,
                pageSize: pageSize
            },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        }))
        return response.data;
    } catch (error) {
        return;
    }
}

const handlePageAsyncWithParams = async (page: number, pageSize: number, status: string,): Promise<Page | undefined> => {
    try {
        const response = await axios.get<Page>(`${apiUrl}/product/${status}`, ({
            params: {
                page: page,
                pageSize: pageSize
            },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        }))
        return response.data;
    } catch (error) {
        return;
    }
}

const handleProductsTotal = async (): Promise<{ total: number } | null> => {
    try {
        const response = await axios.get<Page>(`${apiUrl}/product`, {
            params: {
                page: 0,
                pageSize: pageSize
            },
            headers: headers
        });

        return { total: response.data.page.totalElements };
    } catch (error) {
        return null;
    }
}

const handleActiveList = async (): Promise<ProductSelected[]> => {
    const response = await axios.get<ProductSelected[]>(`${apiUrl}/product/all-active`, {
            headers: headers
        });
    return response.data;
}

const handleFindByDescription = async (description: string): Promise<ProductSelected[]> => {
    const response = await axios.get<ProductSelected[]>(`${apiUrl}/product/find`, {
        headers: headers,
        params: {
            description: description
        }
    })
    return response.data;
}

export { handleFastActive, handleupdateProduct, handleAddProducts, handleCreateProductService, handleFindById, handlePageAsync, handlePageAsyncWithParams, handleProductsTotal, handleActiveList, handleFindByDescription }