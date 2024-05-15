import User from '#models/user'
import { CreateUser } from '#validators/users.validator'
import { cuid } from '@adonisjs/core/helpers'
import { roles } from '../../enums/roles.js'
import SettingsService from './settings.service.js'
import { inject } from '@adonisjs/core'
import { UpdatedAccount } from '#validators/accounts.validator'
import Auth from '#models/auth'
import { providers } from '../../enums/providers.js'
import db from '@adonisjs/lucid/services/db'

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

  async getUsersCount() {
    const count = await db.from('users').count('* as total')
    return count[0].total
  }

  async updateAccount({ password, email, ...userData }: UpdatedAccount) {
    const user = await this.getUserById(userData.id)

    // Ensure the user is allowed to change email or password
    this.verifyEmailChangeEligibility({ user, password, email })

    // Check if the new email is already taken
    if (email && email !== user.email) {
      await this.ensureEmailIsUnique(email, user.id)
    }

    // Update email and/or password in auth provider if necessary
    if ((password || email) && user.auths[0].providerName === providers.email) {
      await this.updateAuthProvider({ user, email, password })
    }

    // Update user data
    user.merge(email ? { ...userData, email } : userData)
    await user.save()

    return user
  }

  private verifyEmailChangeEligibility(data: { user: User; password?: string; email?: string }) {
    if ((data.password || data.email) && data.user.auths[0].providerName !== providers.email) {
      throw new Error('You cannot change the email of a non-email user')
    }
  }

  private async ensureEmailIsUnique(email: string, userId: string) {
    const userExist = await User.query().where('email', email).first()
    if (userExist && userExist.id !== userId) {
      throw new Error('User with the email already exists')
    }
    const authExist = await Auth.query()
      .where('providerId', email)
      .andWhere('providerName', providers.email)
      .first()
    if (authExist && authExist.userId !== userId) {
      throw new Error('Auth with this email already exists')
    }
  }

  private async updateAuthProvider(data: { user: User; password?: string; email?: string }) {
    const authProvider = await Auth.query()
      .where('userId', data.user.id)
      .andWhere('providerName', providers.email)
      .firstOrFail()

    if (data.email) authProvider.providerId = data.email
    if (data.password) authProvider.password = data.password

    await authProvider.save()
  }
}
