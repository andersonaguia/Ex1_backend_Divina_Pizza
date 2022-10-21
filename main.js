import express from 'express'
import cors from 'cors'
import cron from 'node-cron'
import nodemailer from 'nodemailer'

import pizzasRoutes from './src/routes/pizzas.routes.js'
import solicitationsRoutes from './src/routes/solicitations.routes.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use(pizzasRoutes)
app.use(solicitationsRoutes)

app.listen(3333, () => {
    console.log("Server is running!")
})