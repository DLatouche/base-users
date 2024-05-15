import UsersService from '#services/users.service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class DashboardController {
  constructor(private usersService: UsersService) {}

  async showDashboard({ inertia }: HttpContext) {
    const usersCount = await this.usersService.getUsersCount()
    return inertia.render('admin/dashboard/dashboard', { usersCount })
  }
}
