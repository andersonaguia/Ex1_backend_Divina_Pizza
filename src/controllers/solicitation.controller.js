import { v4 as uuidv4 } from 'uuid'

export const findMany = (request, response) => {
    response.json([])
}

export const findOne = (request, response) => {
    const { id } = request.params
    const solicitation = solicitations.find(solicitation => solicitation.id === id)
    return response.json(solicitation) 
}

export const create = (request, response) => {
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
}

export const updateOne = (request, response) => {
    const order_status = request.body.order_status

    const solicitation = solicitations.find(solicitation => solicitation.id === request.params.id)

    if(!solicitation){
        return response.status(404).json({error: 'Desculpe, não encontramos o pedido.'})
    }

    const newSolicitations = solicitations.map((solicitation) => {
        if(solicitation.id === request.params.id){
            solicitation.order = order_status
        }
        return solicitation
    })

    solicitations = [...newSolicitations]

    response.json(order_status)
}
