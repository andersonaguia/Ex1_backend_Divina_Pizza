import { Pizza } from "./pizzas.types"

export interface QueryParamsFindManySolicitations {
    document_client?: string
}

export interface BodyParamsUpdateStatusSolicitations{
    order_status: string
}

export interface RouterParamsUpdateStatusSolicitations{
    id: string
}

export interface BodyParamsCreateSolicitations{
    name_client: string,
    document_client: string,
    contact_client: string,
    address_client: {
        street: string,
        number: number,
        neighborhood: string,
        zip_code: number,
        city: string
    },
    payment_method: string,
    observations: string,
    pizzas: Pizza[],
}

export interface Solicitation{
    id: string,
    name_client: string,
    document_client: string,
    contact_client: string,
    address_client: {
        street: string,
        number: number,
        neighborhood: string,
        zip_code: number,
        city: string
    },
    payment_method: string,
    observations: string,
    pizzas: Pizza[],
    order: string
}