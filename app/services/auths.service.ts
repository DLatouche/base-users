import AlreadyExistException from '#exceptions/already_exist_exception'
import Auth from '#models/auth'
import User from '#models/user'
import { EmailRegister } from '#validators/auths.validator'
import { cuid } from '@adonisjs/core/helpers'
import db from '@adonisjs/lucid/services/db'
import { roles } from '../../enums/roles.js'
import { providers } from '../../enums/providers.js'
import TokensService from './tokens.service.js'
import { inject } from '@adonisjs/core'
import EmailsService from './emails.service.js'

@inject()
export default class AuthsService {
  constructor(
    private tokensService: TokensService,
    private emailsService: EmailsService
  ) {}

  async emailRegister(data: EmailRegister & { roleId?: string }) {
    // check if email is already registered (on users table and auths table)
    const alreadyHasUser = await User.query().where('email', data.email).first()
    const alreadyHasAuth = await Auth.query().where('providerId', data.email).first()
    if (alreadyHasUser || alreadyHasAuth) {
      throw new AlreadyExistException('User already exist')
    }

    // Create user with auth and token for confirm email
    const trx = await db.transaction()
    try {
      const user = await User.create(
        {
          id: cuid(),
          email: data.email,
          username: data.username,
          roleId: data.roleId ?? roles.user.id,
          emailVerified: false,
          avatar: 'avatar_1',
        },
        { client: trx }
      )

      await Auth.create(
        {
          id: cuid(),
          providerId: user.email,
          providerName: providers.email,
          userId: user.id,
          password: data.password,
        },
        { client: trx }
      )

      await trx.commit()
      const token = await this.tokensService.createVerifyToken(user)
      await this.emailsService.sendVerifyEmail(token, user)
      return user
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }

  async verifyEmail(token: string) {
    const user = this.tokensService.verifyEmail(token)
    return user
  }
}
