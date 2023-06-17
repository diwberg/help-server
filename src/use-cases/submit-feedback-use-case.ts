import { FeedbackRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}
export class SubmitFeedbackUseCase {

    constructor(
        private feedbackRepository: FeedbackRepository,
    ){}

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request;
        const feedback = await this.feedbackRepository.create({
            type: type,
            comment: comment,
            screenshot: screenshot,
        })
        return feedback
    }
}