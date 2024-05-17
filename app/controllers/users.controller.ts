import { usersAdminBouncer } from '#abilities/users.bouncer'
import NotFoundException from '#exceptions/not_found_exception'
import UnauthorizedException from '#exceptions/unauthorised_exception'
import SettingsService from '#services/settings.service'
import UsersService from '#services/users.service'
import {
  createUserAdminValidator,
  deleteUserValidator,
  getAllUsersValidator,
  updateUserAdminValidator,
} from '#validators/users.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsersController {
  constructor(
    private usersService: UsersService,
    private settingsService: SettingsService
  ) {}
  async showUsers({ inertia, session, response, bouncer, request }: HttpContext) {
    try {
      if (!(await bouncer.allows(usersAdminBouncer))) throw new UnauthorizedException()
      const data = await getAllUsersValidator.validate(request.all())
      const usersPaginated = await this.usersService.getAllUsers(data)

      return inertia.render('admin/users/users', { usersPaginated: usersPaginated.serialize() })
    } catch (error) {
      session.flash(`errors.${error.code}`, error)
      console.log('users.controller.ts (8) ->error', error)
      return response.redirect().back()
    }
  }

  async showCreateUser({ inertia, session, response, bouncer }: HttpContext) {
    try {
      if (!(await bouncer.allows(usersAdminBouncer))) throw new UnauthorizedException()
      return inertia.render('admin/users/create_user')
    } catch (error) {
      session.flash(`errors.${error.code}`, error)
      console.log('users.controller.ts (34) ->error', error)
      return response.redirect().back()
    }
  }

  async showEditUser({ inertia, session, response, bouncer, request }: HttpContext) {
    try {
      if (!(await bouncer.allows(usersAdminBouncer))) throw new UnauthorizedException()

      const userId = request.params().userId
      if (!userId) throw new NotFoundException('userId not found')

      const userEditing = await this.usersService.getUserById(userId)

      return inertia.render('admin/users/edit_user', { userEditing })
    } catch (error) {
      session.flash(`errors.${error.code}`, error)
      console.log('users.controller.ts (42) ->error', error)
      return response.redirect().back()
    }
  }

  async createUser({ session, response, bouncer, request }: HttpContext) {
    try {
      if (!(await bouncer.allows(usersAdminBouncer))) throw new UnauthorizedException()
      const data = await createUserAdminValidator.validate(request.all())
      await this.usersService.createUserWithAuth(data)
      session.flash(`success.createUser`, 'Utilisateur créé')

      return response.redirect('/admin/users/')
    } catch (error) {
      session.flash(`errors.${error.code}`, error)
      console.log('users.controller.ts (42) ->error', error)
      return response.redirect().back()
    }
  }

  async editUser({ session, response, bouncer, request }: HttpContext) {
    try {
      if (!(await bouncer.allows(usersAdminBouncer))) throw new UnauthorizedException()
      const data = await updateUserAdminValidator.validate(request.all())
      const { theme, ...userData } = data
      await this.usersService.updateAccount(userData)
      await this.settingsService.updateSettings({ userId: data.id, theme })
      session.flash(`success.editUser`, 'Utilisateur mis à jour')
      return response.redirect('/admin/users/')
    } catch (error) {
      session.flash(`errors.${error.code}`, error)
      console.log('users.controller.ts (79) ->error', error)
      return response.redirect().back()
    }
  }

  async deleteUser({ session, response, bouncer, request }: HttpContext) {
    try {
      if (!(await bouncer.allows(usersAdminBouncer))) throw new UnauthorizedException()
      const data = await deleteUserValidator.validate(request.all())
      await this.usersService.deleteUser(data)
      session.flash(`success.deleteUser`, 'Utilisateur supprimé')
      return response.redirect().back()
    } catch (error) {
      session.flash(`errors.${error.code}`, error)
      console.log('users.controller.ts (103) ->error', error)
      return response.redirect().back()
    }
  }
}
