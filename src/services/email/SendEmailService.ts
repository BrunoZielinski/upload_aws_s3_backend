import nodemailer from 'nodemailer'

interface iEmailRequest {
  emailAddress: string
}

class SendEmailService {
  async execute({ emailAddress }: iEmailRequest) {
    let transporter = nodemailer.createTransport({
      name: 'hostgator',
      host: 'mail.matratecnologia.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'noreply@matratecnologia.com',
        pass: 'i%G[CG[LFq.='
      }
    })

    await transporter.sendMail({
      from: '<noreply@matratecnologia.com>',
      to: emailAddress,
      subject: 'E-mail de teste!! ✔',
      text: 'E-mail enviado do nodejs como teste!',
      html: '<b>E-mail enviado do nodejs como teste!</b>'
    })

    return { ok: true }
  }
}

export { SendEmailService }
