import UsersService from '#services/users.service'
import { Authenticators } from '@adonisjs/auth/types'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

@inject()
export default class SlientAuthMiddleware {
  constructor(private usersServices: UsersService) {}
  async handle(
    { inertia, auth }: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {}
  ) {
    try {
      const user = await auth.authenticateUsing(options.guards)
      if (user) {
        const currentUser = await this.usersServices.getUserById(user.id)
        inertia.share({ user: currentUser })
      }
    } catch (e) {}
    return next()
  }
}
