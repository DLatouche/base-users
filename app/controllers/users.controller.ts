import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async showUsers({ inertia }: HttpContext) {
    return inertia.render('admin/users/users')
  }
}
