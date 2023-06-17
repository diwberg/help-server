import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import express from 'express'
import nodemailer from 'nodemailer'
import { prisma } from './prisma';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';


export const router = express.Router()

router.get('/feedbacks', (request, response) => {
    response.send("Hello World")
})

const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "d1c10ec5b7bb87",
      pass: "963bb90a2564fb"
    }
  });

router.post('/feedbacks', async (request, response) => {
    const { type, comment, screenshot } = request.body

    const prismaFeedbacksReposiroty = new PrismaFeedbacksRepository
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksReposiroty)

    const feedback = await submitFeedbackUseCase.execute({type, comment, screenshot})

    /*        
        await transport.sendMail({
            from: 'Equipe ICYou <help@icyou.com>',
            to: 'Diwberg <diwberg@gmail.com>',
            subject: 'Novo feedback',
            html: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
                `<p>Tipo de feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                `</div>`
            ].join('\n')
        })*/
        console.log(feedback)
        return response.status(201).json({data: feedback})
})