import { inject } from '@adonisjs/core'
import AuthsService from '#services/auths.service'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AuthsController {
  constructor(private authsService: AuthsService) {}

  public async showRegister({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }
}
