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

app.delete('/pizzas/:id', (request, response) => {
    const pizzasFiltered = pizzas.filter(pizza => pizza.id !== request.params.id)
    pizzas = [...pizzasFiltered]
    response.json("Excluída com sucesso!")
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

app.patch('/solicitations/:id/done', (request, response) => {
    const solicitation = solicitations.find(solicitation => solicitation.id === request.params.id)

    if(!solicitation){
        return response.status(404).json({error: 'Desculpe, não encontramos o pedido.'})

    }

    const newSolicitations = solicitations.map((solicitation) => {
        if(solicitation.id === request.params.id){
            solicitation.order = "CONCLUÍDO"
        }
        return solicitation
    })

    solicitations = [...newSolicitations]

    response.json()

})

app.listen(3333, () => {
    console.log("Server is running!")
})