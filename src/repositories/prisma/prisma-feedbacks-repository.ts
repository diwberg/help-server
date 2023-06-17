import { prisma } from "../../prisma";
import { FeedbackRepository, FeedbackSchema } from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbackRepository {
    async create(data: FeedbackSchema) {
       const feedback = await prisma.feedback.create({
            data: {
                type: data.type,
                comment: data.comment,
                screenshot: data.screenshot
            }})
    }
}