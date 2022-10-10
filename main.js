const express = require('express')
const { v4: uuidv4 } = require('uuid')
const app = express()
app.use(express.json())

let pizzas = []
let solicitations = []

app.get('/pizzas', (request, response) => {
    const nameQuery = request.query.name || ""

    const pizzasFiltered = pizzas.filter(pizza => pizza.name.toLowerCase().includes(nameQuery.toLowerCase()))

    response.json(pizzasFiltered)
})

app.post('/pizzas', (request, response) => {
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
})

app.get('/solicitations', (request, response) => {
    response.json(solicitations)
})

app.get('/solicitations/:id', (request, response) => {
    const { id } = request.params
    const solicitation = solicitations.find(solicitation => solicitation.id === id)
    return response.json(solicitation) 
})

app.post('/solicitations', (request, response) => {
    const {
        name_client, 
        document_client,
        contact_client,
        address_client,
        payment_method,
        observations,
        pizzas
      } = request.body

    const solicitation = {
        id: uuidv4(),
        name_client, 
        document_client,
        contact_client,
        address_client,
        payment_method,
        observations,
        pizzas,
        order: "EM PRODUÇÃO"
      }
    
      solicitations.push(solicitation)
    
      response.status(201).json(solicitation)
})

app.listen(3333, () => {
    console.log("Server is running!")
})