import { v4 as uuidv4 } from 'uuid'
import { readDataInFile } from '../utils/readDataInFile'
import fs from 'fs'
import { Request, Response } from 'express'
import { 
    Solicitation, 
    QueryParamsFindManySolicitations, 
    BodyParamsCreateSolicitations, 
    BodyParamsUpdateStatusSolicitations,
    RouterParamsUpdateStatusSolicitations 
} from './../types/solicitations.types';


export const findMany = (request: Request<{}, {}, {}, QueryParamsFindManySolicitations>, response: Response) => {
    const document_client = request.query.document_client || ""
    const solicitations = readDataInFile('solicitations.json') as Solicitation[]
    const solicitationsFiltered = solicitations.filter(solicitation => solicitation.document_client.toLowerCase().includes(document_client?.toLowerCase()))
    response.json(solicitationsFiltered)
}

export const create = (request: Request<{}, {}, BodyParamsCreateSolicitations>, response: Response) => {
    const solicitations = readDataInFile('solicitations.json') as Solicitation[]
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

export const updateStatus = (request: Request<RouterParamsUpdateStatusSolicitations, {}, BodyParamsUpdateStatusSolicitations>, response: Response) => {
    const order_status = request.body.order_status
    const id = request.params.id
    const solicitations = readDataInFile('solicitations.json') as Solicitation[]
    const solicitation = solicitations.find(solicitation => solicitation.id === id)

    if(!solicitation){
        return response.status(404).json({error: 'Desculpe, não encontramos o pedido.'})
    }

    const newSolicitations = solicitations.map((solicitation) => {
        if(solicitation.id === id){
            solicitation.order = order_status
        }
        return solicitation
    })

    fs.writeFileSync('solicitations.json', JSON.stringify(newSolicitations))

    response.json(order_status)
}
