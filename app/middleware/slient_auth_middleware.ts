import { Authenticators } from '@adonisjs/auth/types'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class SlientAuthMiddleware {
  async handle(
    { inertia, auth }: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {}
  ) {
    try {
      const user = await auth.authenticateUsing(options.guards)
      await user?.load('role')
      inertia.share({ user })
    } catch (e) {}

    return next()
  }
}
