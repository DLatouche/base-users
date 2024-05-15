import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { updatedAccountValidator } from '#validators/accounts.validator'
import UnauthorizedException from '#exceptions/unauthorised_exception'
import UsersService from '#services/users.service'
import { editUserBouncer } from '#abilities/users.bouncer'
import SettingsService from '#services/settings.service'

@inject()
export default class AccountController {
  constructor(
    private usersServices: UsersService,
    private settingsService: SettingsService
  ) {}

  async showAccount({ inertia }: HttpContext) {
    return inertia.render('account/account')
  }

  async updateAccount({ response, bouncer, session, request }: HttpContext) {
    try {
      const data = await updatedAccountValidator.validate(request.all())
      const userUpdated = await this.usersServices.getUserById(data.id)
      if (!(await bouncer.allows(editUserBouncer, userUpdated))) throw new UnauthorizedException()

      //remove settings from data
      const { theme, ...userData } = data
      await this.usersServices.updateAccount(userData)
      await this.settingsService.updateSettings({ userId: data.id, theme })

      session.flash('success.account', 'Compte mis à jour')

      response.redirect().back()
    } catch (error) {
      session.flash(`errors.${error.code}`, error)
      console.log('account.controller.ts (22) -> error', error)
      return response.redirect().back()
    }
  }
}
