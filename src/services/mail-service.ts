export interface SendMailData {
    subject: string
    body: string[]
}

export interface MailHandle {
    sendMail: (data: SendMailData) => Promise<void>;
}