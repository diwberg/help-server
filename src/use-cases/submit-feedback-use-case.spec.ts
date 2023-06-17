import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy},
)

describe('Submit feedback', () => {

    it('sould be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
        type: 'BUG',
        comment: 'Exemple comment',
        screenshot: 'data:image/png;base64/teste',
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()
    
    })
    
    
    it('sould not be able to submit feedback without type', async () => {
    await expect(submitFeedback.execute({
        type: '',
        comment: 'Exemple comment',
        screenshot: 'test.jpg',
    })).rejects.toThrow();
    })
    
    
    it('sould not be able to submit feedback without comment', async () => {
    await expect(submitFeedback.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'test.jpg',
    })).rejects.toThrow();
    })


    it('sould not be able to submit feedback with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
        type: 'BUG',
        comment: 'Exemple comment',
        screenshot: 'test.jpg',
    })).rejects.toThrow();
    })





})