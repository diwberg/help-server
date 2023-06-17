import { prisma } from "../../prisma";
import { FeedbackRepository, FeedbackCreateSchema } from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbackRepository {
    async create(data: FeedbackCreateSchema) {
       const feedback:FeedbackCreateSchema = await prisma.feedback.create({
            data: {
                type: data.type,
                comment: data.comment,
                screenshot: data.screenshot
            }})

        return feedback
    }
}