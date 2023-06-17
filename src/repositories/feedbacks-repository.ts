export interface FeedbackCreateSchema {
    id?: string;
    type: string;
    comment: string;
    screenshot?: string | null;
}

export interface FeedbackRepository {
    create: (data: FeedbackCreateSchema) => Promise<FeedbackCreateSchema>;
}