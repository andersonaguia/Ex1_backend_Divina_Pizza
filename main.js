const express = require('express')
const { v4: uuidv4 } = require('uuid')
const app = express()
app.use(express.json())

let pizzas = []

app.get('/pizzas', (request, response) => {
    const nameQuery = request.query.name || ""

    const pizzasFiltered = pizzas.filter(pizza => pizza.name.toLowerCase().includes(nameQuery.toLowerCase()))

    response.json(pizzasFiltered)
})

app.post('/pizzas', (request, response) => {
    const { name, description, price, url } = request.body

    const pizzaExists = pizzas.find(pizza => pizza.name === name)

    if(pizzaExists){
        return response.status(401).json({error: "Já existe uma pizza com o mesmo nome!"})
    }

    const pizza = {
        id: uuidv4(),
        name: name,
        description,
        url,
        price
    }
    pizzas.push(pizza)

    response.status(201).json(pizzas)
})

app.listen(3333, () => {
    console.log("Server is running!")
})