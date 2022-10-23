import { v4 as uuidv4 } from 'uuid'
import { readDataInFile } from '../utils/readDataInFile'
import fs from 'fs'
import { Request, Response } from 'express'
import { QueryParamsFindManyPizzas, BodyParamsCreatePizza, RouterParamsPizza } from './../types/pizzas.types';
import { Pizza } from '../types/pizzas.types'

export const findMany = (request: Request<{}, {}, {}, QueryParamsFindManyPizzas>, response: Response) => {
    const nameQuery = request.query.name || ""
    const pizzas = readDataInFile('pizzas.json') as Pizza[]
    const pizzasFiltered = pizzas.filter(pizza => pizza.name?.toLowerCase().includes(nameQuery.toLowerCase()))
    response.json(pizzasFiltered)
}

export const create = (request: Request<{}, {}, BodyParamsCreatePizza>, response: Response) => {
    const { name, description, price, url, ingredients } = request.body

    const pizzas = readDataInFile('pizzas.json') as Pizza[]

    const pizzaExists = pizzas.find(pizza => pizza.name === name)

    if(pizzaExists){
        return response.status(401).json({error: "Já existe uma pizza com o mesmo nome!"})
    }

    const pizza = {
        id: uuidv4(),
        name: name,
        description,
        price,
        url,        
        ingredients
    }

    fs.writeFileSync('pizzas.json', JSON.stringify([...pizzas, pizza]))

    response.status(201).json(pizza)   
}

export const destroy = (request: Request<RouterParamsPizza>, response: Response) => {
    const idPizza = request.params.id
    const pizzas = readDataInFile('pizzas.json') as Pizza[]
    const pizzasFiltered = pizzas.filter(pizza => pizza.id !== idPizza)
    fs.writeFileSync('pizzas.json', JSON.stringify(pizzasFiltered))
    response.json("Excluída com sucesso!")
}

export function update(request: Request<RouterParamsPizza, {}, BodyParamsCreatePizza>, response: Response) {
    const idPizza = request.params.id
    const { name, description, price, url, ingredients } = request.body
    const pizzas = readDataInFile('pizzas.json') as Pizza[]
  
    const updatedPizzas = pizzas.map(pizza => {
      if (pizza.id === idPizza) {
        pizza.name = name || pizza.name
        pizza.description = description || pizza.description
        pizza.price = price || pizza.price
        pizza.url = url || pizza.url
        pizza.ingredients = ingredients || pizza.ingredients        
      }
      return pizza
    })
  
    fs.writeFileSync('pizzas.json', JSON.stringify(updatedPizzas))
  
    return response.json('Atualizada com sucesso')
}

