import axios, { AxiosError } from "axios";
import { Page, Sale, SaleDetais } from "../../models/Models";
import { ErrorRequest } from "../productService/productService";


const apiUrl = process.env.REACT_APP_API_URL

const pageSize = Math.floor((window.innerHeight / 100) / 2 + 1);



export interface Response {
    response: ErrorRequest | Sale | Page | SaleDetais
    status: number
}

const headers = {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
}

const handleTotalSalesToday = async (): Promise<{ total: number } | null> => {

    const today = new Date();
    const startDate = new Date(today.setHours(0, 0, 0)).toISOString().slice(0, 19);
    const endDate = new Date(today.setHours(23, 59, 59)).toISOString().slice(0, 19);

    try {
        const response = await axios.get<Page>(`${apiUrl}/sale`, {
            params: {
                startDate: startDate,
                endDate: endDate,
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

const handlelSalesToday = async (): Promise<Response> => {

    const today = new Date();
    const startDate = new Date(today.setHours(0, 0, 0)).toISOString().slice(0, 19);
    const endDate = new Date(today.setHours(23, 59, 59)).toISOString().slice(0, 19);

    try {
        const response = await axios.get<Page>(`${apiUrl}/sale`, {
            params: {
                startDate: startDate,
                endDate: endDate,
                page: 0,
                pageSize: pageSize
            },
            headers: headers
        });

        return {response: response.data, status: response.status};
    } catch (error) {
        const err = error as AxiosError;
        const data = err.response?.data as { status: number, message: string }
        return { status: data.status, response: data }
    }
}


const handleSalesValue = async (): Promise<number | undefined> => {
    const today = new Date();
    const start = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-01`;
    const end = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const startDate = formatLocalDateTimeStart(start)
    const endDate = formatLocalDateTimeEnd(end)

    try {
        const response = await axios.get(`${apiUrl}/sale/totalBetween`, {
            params: {
                startDate: startDate,
                endDate: endDate
            },
            headers: headers
        })
        return response.data
    } catch (error) {

    }
}

const handleSales = async (startDate: string, endDate: string, page: number): Promise<Response> => {
    const start = formatLocalDateTimeStart(startDate!);
    const end = formatLocalDateTimeEnd(endDate!);

    console.log(pageSize)

    try {
        const response = await axios.get<Page>(`${apiUrl}/sale`, {
            params: {
                startDate: start,
                endDate: end,
                page: page,
                pageSize: pageSize
            },
            headers: headers
        });

        return {response: response.data, status: response.status};
    } catch (error) {
        const err = error as AxiosError;
        const data = err.response?.data as { status: number, message: string }
        return { status: data.status, response: data }
    }
}

const handleSalesValueBewteen = async (startDate: string, endDate: string): Promise<number> => {
    const start = formatLocalDateTimeStart(startDate!);
    const end = formatLocalDateTimeEnd(endDate!);
    const response = await axios.get(`${apiUrl}/sale/totalBetween`, {
        params: {
            startDate: start,
            endDate: end
        },
        headers: headers
    })
    return response.data
}

const handleSaleByid = async (id: string): Promise<Response> => {
    try {
        const response = await axios.get<SaleDetais>(`${apiUrl}/sale/${id}`, {
            headers: headers
        })
        return { response: response.data, status: response.status }
    } catch (error) {
        const err = error as AxiosError;
        const data = err.response?.data as { status: number, message: string }
        return { status: data.status, response: data }
    }
}

const handleSaleCompleteByPeriod = async (startDate: string, endDate: string): Promise<SaleDetais[]> => {
    const start = formatLocalDateTimeStart(startDate!);
    const end = formatLocalDateTimeEnd(endDate!);
    const response = await axios.get<SaleDetais[]>(`${apiUrl}/sale/all`,{
        params: {
            startDate: start,
            endDate: end,
        },
        headers: headers
    });
    console.log(response)
    return response.data
}

export { handleTotalSalesToday, handlelSalesToday, handleSalesValue, handleSales, handleSalesValueBewteen, handleSaleByid, handleSaleCompleteByPeriod }

const formatLocalDateTimeStart = (date: string): string => {
    return `${date}T00:00:00`;
};

const formatLocalDateTimeEnd = (date: string): string => {
    return `${date}T23:59:59`;
};
