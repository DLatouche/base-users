import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  async showDashboard({ inertia }: HttpContext) {
    return inertia.render('admin/dashboard/dashboard')
  }
}
