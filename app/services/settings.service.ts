import Setting from '#models/setting'
import { CreateSettings } from '#validators/settings.validator'
import { cuid } from '@adonisjs/core/helpers'

export default class SettingsService {
  async createSettings(data: CreateSettings) {
    const settings = await Setting.create({
      id: cuid(),
      userId: data.userId,
      menuExpanded: data.menuExpanded ?? true,
      theme: data.theme ?? 'theme-blue',
    })

    return settings
  }

  async updateSettings(data: CreateSettings) {
    const settings = await Setting.findByOrFail('userId', data.userId)

    settings.merge({
      menuExpanded: data.menuExpanded,
      theme: data.theme,
    })
    await settings.save()

    return settings
  }
}
