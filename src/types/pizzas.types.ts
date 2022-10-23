export interface QueryParamsFindManyPizzas {
    name?: string
}

export interface BodyParamsCreatePizza{
    name: string,
    description: string,
    price: number,
    url: string,
    ingredients: string[]
}

export interface RouterParamsPizza{
    id: string
}

export interface Pizza{
    id: string,
    name: string,
    description: string,
    price: number,
    url: string,
    ingredients: string[]
}