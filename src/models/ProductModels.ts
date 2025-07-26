export interface ProductCreate {
    description: string,
    costPrice: number,
    sellingPrice: number,
    offPrice: number,
    category: string
}

export interface ProductUpdate extends ProductCreate {
    isActive: boolean
}

export interface ProductCreated {
  id: number
  description: string,
  costPrice: number,
  sellingPrice: number,
  offPrice: number,
  category: string,
  isActive: boolean,
  quantity: number,
  code: string
}

export interface Product {
    quantity: number
    id: number
    description: string,
    costPrice: number
    sellingPrice: number
    offPrice: number
    category: string,
    isActive: boolean,
    code: number
}