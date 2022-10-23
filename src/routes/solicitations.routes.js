import { Router } from 'express'
import { findMany, create, updateStatus } from '../controllers/solicitation.controller'
const solicitationsRoutes = Router()

solicitationsRoutes.get('/solicitations', findMany)
solicitationsRoutes.post('/solicitations', create)
solicitationsRoutes.patch('/solicitations/:id/change_order', updateStatus)

export default solicitationsRoutes