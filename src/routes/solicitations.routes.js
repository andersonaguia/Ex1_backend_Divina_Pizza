import { Router } from 'express'
import { findMany, create, findOne, updateOne } from '../controllers/solicitation.controller.js'
const solicitationsRoutes = Router()

solicitationsRoutes.get('/solicitations', findMany)
solicitationsRoutes.get('/solicitations/:id', findOne)
solicitationsRoutes.post('/solicitations', create)
solicitationsRoutes.patch('/solicitations/:id/change_order', updateOne)

export default solicitationsRoutes