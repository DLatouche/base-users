import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'

@inject()
export default class AccountController {
  constructor() {}

  async showAccount({ inertia }: HttpContext) {
    return inertia.render('account/account')
  }
}
