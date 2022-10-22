import express from 'express'
import cors from 'cors'
import cron from 'node-cron'
import pizzasRoutes from './routes/pizzas.routes.js'
import solicitationsRoutes from './routes/solicitations.routes.js'
import { sendMailSolicitationInProduction } from './jobs/sendEmailSolicitationInProduction.js';

const app = express()

app.use(express.json())
app.use(cors())
app.use(pizzasRoutes)
app.use(solicitationsRoutes)

cron.schedule('*/1 * * * *', sendMailSolicitationInProduction)

export default app