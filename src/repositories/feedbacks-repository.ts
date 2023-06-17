export interface FeedbackSchema {
    id?: string;
    type: string;
    comment: string;
    screenshot?: string | null;
}

export interface FeedbackRepository {
    create: (data: FeedbackSchema) => Promise<void>;
}