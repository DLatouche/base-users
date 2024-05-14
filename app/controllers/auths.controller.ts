import { inject } from '@adonisjs/core'
import AuthsService from '#services/auths.service'
import { HttpContext } from '@adonisjs/core/http'
import { emailRegisterValidator } from '#validators/auths.validator'

@inject()
export default class AuthsController {
  constructor(private authsService: AuthsService) {}

  public async showRegister({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  public async showRegistered({ inertia }: HttpContext) {
    return inertia.render('auth/registered')
  }

  public async emailRegister({ request, response, session }: HttpContext) {
    try {
      const data = await emailRegisterValidator.validate(request.all())
      await this.authsService.emailRegister(data)
      session.flash(`success.register`, 'Inscription réussie')
      return response.redirect().toRoute('/auth/registered')
    } catch (error) {
      console.log('auths.controller.ts (21) -> error', error.code, '->', error.message)
      session.flash(`errors.${error.code}`, error)
      return response.redirect().back()
    }
  }
}
