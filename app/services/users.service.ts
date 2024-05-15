import User from '#models/user'
import { CreateUser } from '#validators/users.validator'
import { cuid } from '@adonisjs/core/helpers'
import { roles } from '../../enums/roles.js'
import SettingsService from './settings.service.js'
import { inject } from '@adonisjs/core'

@inject()
export default class UsersService {
  constructor(private settingsService: SettingsService) {}

  async createUser(data: CreateUser) {
    const user = await User.create({
      id: cuid(),
      username: data.username,
      email: data.email,
      roleId: data.roleId ?? roles.user.id,
      emailVerified: data.emailVerified ?? false,
      avatar: data.avatar ?? 'avatar_1',
    })

    await this.settingsService.createSettings({
      userId: user.id,
    })
    return user
  }

  async getUserById(userId: string) {
    return await User.query()
      .preload('role')
      .preload('setting')
      .preload('auths')
      .where('id', userId)
      .firstOrFail()
  }
}
