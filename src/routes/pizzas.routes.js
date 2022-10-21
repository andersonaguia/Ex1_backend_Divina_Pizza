import { Router } from 'express'
import { findMany, create, destroy } from '../controllers/pizza.controller.js'

const pizzasRoutes = Router()

pizzasRoutes.get('/pizzas', findMany)
pizzasRoutes.post('/pizzas', create)
pizzasRoutes.delete('/pizzas/:id', destroy)

export default pizzasRoutes