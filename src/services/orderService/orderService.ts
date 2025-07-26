import axios, { AxiosError } from "axios";
import { Order, Page, Sale } from "../../models/Models";
import { ErrorRequest } from "../productService/productService";

const apiUrl = process.env.REACT_APP_API_URL

const headers = {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
}

export interface Response {
    response: Order | ErrorRequest | Sale
    status: number
}

const pageSize = Math.floor((window.innerHeight / 100) + 1);

const handleOpenOrdersTotal = async (): Promise<{ total: number }> => {
    const response = await axios.get<Page>(`${apiUrl}/order/open`, {
        params: {
            page: 0,
            pageSize: pageSize
        },
        headers: headers
    });
    return { total: response.data.page.totalElements };
}

const handleClosedOrdersTotal = async (): Promise<{ total: number }> => {
    const response = await axios.get<Page>(`${apiUrl}/order/closed-today`, {
        params: {
            page: 0,
            pageSize: pageSize
        },
        headers: headers
    });
    return { total: response.data.page.totalElements };
}

const handleCreateOrder = async (clientName: string): Promise<Response> => {
    try {
        const response = await axios.post<Order>(`${apiUrl}/order`, {
            clientName: clientName
        }, {
            headers: headers
        });
        return { response: response.data, status: 201 }
    } catch (error) {
        const err = error as AxiosError;
        const data = err.response?.data as { status: number, message: string }
        return { status: data.status, response: data }
    }
}

const handleOrderById = async (id: string): Promise<Response> => {
    try {
        const response = await axios.get<Order>(`${apiUrl}/order/${id}`, {
            headers: headers
        });
        return { status: response.status, response: response.data }
    } catch (error) {
        const err = error as AxiosError;
        const data = err.response?.data as { status: number, message: string }
        return { status: data.status, response: data }
    }
}

const handleOpenOrders = async (page: number): Promise<Page> => {
    const response = await axios.get<Page>(`${apiUrl}/order/open`, {
        params: {
            page: page,
            pageSize: pageSize
        },
        headers: headers
    })
    return response.data
}

const deleteOrder = async (id: string): Promise<{ status: number }> => {
    const response = await axios.delete(`${apiUrl}/order/${id}`, {
        headers: headers
    });
    return response.data
}

const handleInsertItem = async (orderId: string, productId: string): Promise<Response> => {
    try {
        const response = await axios.patch(`${apiUrl}/order/insert-item`, {}, {
            params: {
                orderId: orderId,
                productId: productId
            },
            headers: headers
        });
        return { status: response.status, response: response.data }
    } catch (error) {
        const err = error as AxiosError;
        const data = err.response?.data as { status: number, message: string }
        return { status: data.status, response: data }
    }
}

const handleDeleteItem = async (orderId: string, productId: string): Promise<Response> => {
    try {
        const response = await axios.patch(`${apiUrl}/order/delete-item`, {}, {
            params: {
                orderId: orderId,
                productId: productId
            },
            headers: headers
        });
        return { status: response.status, response: response.data }
    } catch (error) {
        const err = error as AxiosError;
        const data = err.response?.data as { status: number, message: string }
        return { status: data.status, response: data }
    }
}

const handleCloserOrderService = async (orderId: string, paymentType: string): Promise<Response> => {
    try {
        const response = await axios.patch(`${apiUrl}/order/close`, {}, {
            params: {
                orderId: orderId,
                paymentType: paymentType
            },
            headers: headers
        });
        return { status: response.status, response: response.data }
    } catch (error) {
        const err = error as AxiosError;
        const data = err.response?.data as { status: number, message: string }
        return { status: data.status, response: data }
    }
}

const handleAddItemQuantity = async (orderId: string, productId: string): Promise<Response> => {
    try {
        const response = await axios.patch(`${apiUrl}/order/add-item-quantity`, {}, {
            params: {
                orderId: orderId,
                productId: productId
            },
            headers: headers
        });
        return { status: response.status, response: response.data }
    } catch (error) {
        const err = error as AxiosError;
        const data = err.response?.data as { status: number, message: string }
        return { status: data.status, response: data }
    }
}

const handleRemoveItemQuantity = async (orderId: string, productId: string): Promise<Response> => {
    try {
        const response = await axios.patch(`${apiUrl}/order/remove-item-quantity`, {}, {
            params: {
                orderId: orderId,
                productId: productId
            },
            headers: headers
        });
        return { status: response.status, response: response.data }
    } catch (error) {
        const err = error as AxiosError;
        const data = err.response?.data as { status: number, message: string }
        return { status: data.status, response: data }
    }
}

export {
    handleOpenOrdersTotal, handleOpenOrders, handleCreateOrder, handleClosedOrdersTotal, handleOrderById,
    deleteOrder, handleInsertItem, handleRemoveItemQuantity, handleAddItemQuantity, handleDeleteItem, handleCloserOrderService
}