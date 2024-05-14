import CaptchaException from '#exceptions/captcha_exception'
import CaptchaService from '#services/captcha.service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

@inject()
export default class CaptchaMiddleware {
  constructor(private captchaService: CaptchaService) {}

  async handle(ctx: HttpContext, next: NextFn) {
    try {
      const { captcha } = ctx.request.all()

      if (!captcha) {
        throw new CaptchaException('Captcha not found')
      }
      const validCaptcha = await this.captchaService.verifyCaptcha(captcha)
      if (!validCaptcha) {
        throw new CaptchaException('Captcha is not valid')
      }
      await next()
    } catch (error) {
      console.log('middleware.js -> 48: checkCaptcha error', error)
      throw error
    }
  }
}
