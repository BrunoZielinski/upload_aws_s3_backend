import { Request, Response } from 'express'
import { SendEmailService } from '../../services/email/SendEmailService'

class SendEmailController {
  async handle(req: Request, res: Response) {
    const { emailAddress } = req.body

    const service = new SendEmailService()
    const email = await service.execute({ emailAddress })

    return res.json(email)
  }
}

export { SendEmailController }
