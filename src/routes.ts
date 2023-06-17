import { NodeMailerMailService } from './services/nodemailer/nodemailer-mail-service';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import express from 'express'

import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';


export const router = express.Router()

router.get('/feedbacks', (request, response) => {
    response.send("Hello World")
})


router.post('/feedbacks', async (request, response) => {
    const { type, comment, screenshot } = request.body

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository

    const nodeMailerMailService = new NodeMailerMailService

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository, nodeMailerMailService)

    const feedbackId = await submitFeedbackUseCase.execute({type, comment, screenshot})

        return response.status(201).send()
})