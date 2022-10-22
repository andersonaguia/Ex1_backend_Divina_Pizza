import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user:process.env.USER_CREDENTIAL_SERVICE_EMAIL,
        pass: process.env.PASSWORD_CREDENTIAL_SERVICE_EMAIL
    }
})

export const sendMailSolicitationInProduction = () => {
    solicitations.forEach(solicitation => {
        if(solicitation.order === 'EM PRODUÇÃO'){
            transporter.sendMail({
                from: 'devinhouse@gmail.com',
                to: 'teste@gmail.com',
                subject: 'Sua pizza está chegando',
                html: `<p>Olá ${solicitation.name_client}, sua pizza está em produção.</p>`
            }, (err, info) => {
                if(err)
                    console.log(err)
                else
                    console.log(info)
            })
        }
    })
}