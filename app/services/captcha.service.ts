import env from '#start/env'
import axios from 'axios'

export default class CaptchaService {
  constructor() {}

  async verifyCaptcha(captcha: string) {
    try {
      const secretKey = env.get('H_CAPTCHA_SECRET_KEY') ?? ''
      const verifyUrl = 'https://hcaptcha.com/siteverify'
      const formData = new URLSearchParams()
      formData.append('response', captcha)
      formData.append('secret', secretKey)
      const result = await axios.post(verifyUrl, formData.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      return !!result.data.success
    } catch (error) {
      console.log('CaptchaService.js -> 45: checkCaptcha error', error)
      throw error
    }
  }
}
