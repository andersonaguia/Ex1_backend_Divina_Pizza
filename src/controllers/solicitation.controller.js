import { v4 as uuidv4 } from 'uuid'
import { getDataInFile } from '../utils/getDataInFile.js'
import fs from 'fs'

export const findMany = (request, response) => {
    const document_client = request.query.document_client || ""
    const solicitations = getDataInFile('solicitations.json')
    const solicitationsFiltered = solicitations.filter(solicitation => solicitation.document_client?.toLowerCase().includes(document_client.toLowerCase()))
    response.json(solicitationsFiltered)
}

export const create = (request, response) => {
    const solicitations = getDataInFile('solicitations.json')
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
    
      fs.writeFileSync('solicitations.json', JSON.stringify([...solicitations, solicitation]))
    
      response.status(201).json(solicitation)
}

export const updateOne = (request, response) => {
    const order_status = request.body.order_status
    const solicitations = getDataInFile('solicitations.json')
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

    fs.writeFileSync('solicitations.json', JSON.stringify(newSolicitations))

    response.json(order_status)
}
