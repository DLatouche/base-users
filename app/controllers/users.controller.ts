import { usersAdminBouncer } from '#abilities/users.bouncer'
import UnauthorizedException from '#exceptions/unauthorised_exception'
import UsersService from '#services/users.service'
import { createUserAdminValidator, getAllUsersValidator } from '#validators/users.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsersController {
  constructor(private usersService: UsersService) {}
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
}
