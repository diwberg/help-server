import { MailHandle } from './../services/mail-service';
import { FeedbackRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {

    constructor(
        private feedbackRepository: FeedbackRepository,
        private mailHandle: MailHandle
    ){}

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request;
        
        if(!type) {
            throw new Error('Type is required')
        }
        
        if(!comment) {
            throw new Error('Comment is required')
        }

        if(screenshot && !screenshot.startsWith('data:image/png;base64')){
            throw new Error('Invalid screenshot format.')
        }

        const feedback = await this.feedbackRepository.create({
            type: type,
            comment: comment,
            screenshot: screenshot,
        })

        const data = {
            subject: 'Foi enviado um novo feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
                `<p>Tipo de feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                `</div>`
            ]
        }
        await this.mailHandle.sendMail(data)
        return feedback
    }

}