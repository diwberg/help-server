import nodemailer from 'nodemailer'
import { MailHandle, SendMailData } from '../mail-service';

export class NodeMailerMailService implements MailHandle {
    
    async sendMail(data: SendMailData) {
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "d1c10ec5b7bb87",
                pass: "963bb90a2564fb"
            }
        });
        await transport.sendMail({
            from: 'Equipe ICYou <help@icyou.com>',
            to: 'Diwberg <diwberg@gmail.com>',
            subject: data.subject,
            html: data.body.join('\n')
        })
    }
}
