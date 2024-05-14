import env from '#start/env'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

// Share middleware: used to share data with all Inertia pages
export default class ShareMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    ctx.inertia.share({ SITE_KEY: env.get('H_CAPTCHA_SITE_KEY') ?? '' })

    return next()
  }
}
