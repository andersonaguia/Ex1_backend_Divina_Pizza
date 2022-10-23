import { v4 as uuidv4 } from 'uuid'
import { getDataInFile } from '../utils/getDataInFile.js'
import fs from 'fs'

export const findMany = (request, response) => {
    const nameQuery = request.query.name || ""
    const pizzas = getDataInFile('pizzas.json')
    const pizzasFiltered = pizzas.filter(pizza => pizza.name?.toLowerCase().includes(nameQuery.toLowerCase()))
    response.json(pizzasFiltered)
}

export const create = (request, response) => {
    const { name, description, price, url, ingredients } = request.body

    const pizzas = getPizzasInFile()

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

export const destroy = (request, response) => {
    const pizzas = getDataInFile('pizzas.json')
    const pizzasFiltered = pizzas.filter(pizza => pizza.id !== request.params.id)
    fs.writeFileSync('pizzas.json', JSON.stringify(pizzasFiltered))
    response.json("Excluída com sucesso!")
}

export function update(request, response) {
    const pizzas = getDataInFile('pizzas.json')
  
    const updatedPizzas = pizzas.map(pizza => {
      if (pizza.id === request.params.id) {
        pizza.name = request.body.name || pizza.name
        pizza.description = request.body.description || pizza.description
        pizza.price = request.body.price || pizza.price
        pizza.url = request.body.url || pizza.url
        pizza.ingredients = request.body.ingredients || pizza.ingredients        
      }
      return pizza
    })
  
    fs.writeFileSync('pizzas.json', JSON.stringify(updatedPizzas))
  
    return response.json('Atualizada com sucesso')
}

