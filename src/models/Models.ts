export type LoginResponse = {
    token: string
}

export interface Page {
    content: [],
    page: {
        size: number,
        number: number,
        totalElements: number,
        totalPages: number
    }
}

export interface Sale {
    id: number;
    saleDate: string;
    clientName: string;
    totalPrice: number;
    paymentType: string;
}

export interface SaleDetais {
    id: number
    order: Order
}

export interface Order {
    id: number,
    clientName: string,
    orderDateTime: string,
    items: OrderItem[],
    totalPrice: number,
    paymentType: string,
    status: string
}

export interface OrderItem {
    productId: number
    productName: string
    quantity: number
    unitPrice: number
}

