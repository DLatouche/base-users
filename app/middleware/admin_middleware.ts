import { Authenticators } from '@adonisjs/auth/types'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AdminMiddleware {
  redirectTo = '/'

  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {}
  ) {
    try {
      await ctx.auth.authenticateUsing(options.guards, { loginRoute: this.redirectTo })
    } catch {
      return ctx.response.redirect(this.redirectTo)
    }

    const user = ctx.auth.user

    // Check if the user is an admin
    if (!user || !user.isAdmin) {
      return ctx.response.redirect(this.redirectTo)
    }

    return next()
  }
}
