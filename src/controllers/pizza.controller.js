import { v4 as uuidv4 } from 'uuid'

export const findMany = (request, response) => {
    const nameQuery = request.query.name || ""
    const pizzasFiltered = pizzas.filter(pizza => pizza.name.toLowerCase().includes(nameQuery.toLowerCase()))
    response.json(pizzasFiltered)
}

export const create = (request, response) => {
    const { name, description, price, url, ingredients } = request.body
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
    pizzas.push(pizza)
    response.status(201).json(pizzas)   
}

export const destroy = (request, response) => {
    const pizzasFiltered = pizzas.filter(pizza => pizza.id !== request.params.id)
    pizzas = [...pizzasFiltered]
    response.json("Excluída com sucesso!")
}

