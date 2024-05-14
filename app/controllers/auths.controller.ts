import { inject } from '@adonisjs/core'
import AuthsService from '#services/auths.service'
import { HttpContext } from '@adonisjs/core/http'
import {
  emailRegisterValidator,
  emailVerifyValidator,
  requestResetPasswordValidator,
  resetPasswordValidator,
} from '#validators/auths.validator'

@inject()
export default class AuthsController {
  constructor(private authsService: AuthsService) {}

  public async showRegister({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  public async showRegistered({ inertia }: HttpContext) {
    return inertia.render('auth/registered')
  }

  public async showVerifyError({ inertia }: HttpContext) {
    return inertia.render('auth/verify_error')
  }

  public async showRequestResetPassword({ inertia }: HttpContext) {
    return inertia.render('auth/password/request_reset_password')
  }

  public async requestResetPassword({ inertia, response, session, request }: HttpContext) {
    try {
      const data = await requestResetPasswordValidator.validate(request.all())
      await this.authsService.requestResetPassword(data)

      return inertia.render('auth/password/request_reset_password_success')
    } catch (error) {
      console.log('auths.controller.ts (31) -> error', error.code, '->', error.message)
      session.flash(`errors.${error.code}`, error)
      return response.redirect().back()
    }
  }

  public async showResetPassword({ inertia }: HttpContext) {
    return inertia.render('auth/password/reset_password')
  }

  public async resetPassword({ inertia, response, session, request }: HttpContext) {
    try {
      const data = await resetPasswordValidator.validate(request.all())
      await this.authsService.resetPassword(data)
      return inertia.render('auth/password/reset_password_success')
    } catch (error) {
      console.log('auths.controller.ts (31) -> error', error.code, '->', error.message)
      session.flash(`errors.${error.code}`, error)
      return response.redirect().back()
    }
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

  public async verifyEmail({ request, response, session, inertia }: HttpContext) {
    try {
      const data = await emailVerifyValidator.validate(request.all())
      await this.authsService.verifyEmail(data.token)
      return inertia.render('auth/verify')
    } catch (error) {
      console.log('%auths.controller.ts (41) -> error', error)
      session.flash(`errors.${error.code}`, error)
      return response.redirect().toRoute('/auth/email/verifyError')
    }
  }

  async googleRedirect({ ally, request, session }: HttpContext) {
    // source is used to redirect to the correct page after login
    const source = request.qs().source
    session.put('source', source)
    return ally.use('google').redirect()
  }

  async googleCallback({ ally, session, auth, response }: HttpContext) {
    const source = session.get('source')
    // source is used to redirect to the correct page after login like admin dashboard
    const pathToRedirect = source === 'admin' ? '/admin/dashboard' : '/'
    const google = ally.use('google')
    if (google.accessDenied()) {
      session.flash({ type: 'error', message: 'Access was denied' })
      return response.redirect().toRoute(pathToRedirect)
    }
    if (google.stateMisMatch()) {
      session.flash({ type: 'error', message: 'Request expired. Retry again' })
      return response.redirect().toRoute(pathToRedirect)
    }
    if (google.hasError()) {
      session.flash({ type: 'error', message: google.getError()?.toString() ?? 'unknown error' })
      return response.redirect().toRoute(pathToRedirect)
    }

    const googleUser = await google.user()
    const user = await this.authsService.googleLogin(googleUser)
    await auth.use('web').login(user)
    return response.redirect().toRoute(pathToRedirect)
  }
}
