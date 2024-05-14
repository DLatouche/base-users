import Token from '#models/token'
import User from '#models/user'
import env from '#start/env'
import mail from '@adonisjs/mail/services/main'

export default class EmailsService {
  constructor() {}

  async sendVerifyEmail(token: Token, user: User) {
    await mail.send((msg) => {
      const link = `${env.get('CALLBACK_VERIFY_EMAIL_URL')}?token=${token.hash}`
      msg
        .to(user.email)
        .from(env.get('RESEND_FROM') ?? '')
        .subject(`Verify your email`)
        .htmlView('emails/verify_email_html', { name: user.username, link })
        .textView('emails/verify_email_text', { name: user.username, link })
    })
  }
}
