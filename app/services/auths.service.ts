import AlreadyExistException from '#exceptions/already_exist_exception'
import Auth from '#models/auth'
import User from '#models/user'
import {
  EmailLogin,
  EmailRegister,
  RequestResetPassword,
  ResetPassword,
} from '#validators/auths.validator'
import { cuid } from '@adonisjs/core/helpers'
import db from '@adonisjs/lucid/services/db'
import { roles } from '../../enums/roles.js'
import { providers } from '../../enums/providers.js'
import TokensService from './tokens.service.js'
import { inject } from '@adonisjs/core'
import EmailsService from './emails.service.js'
import { GoogleUser } from '../../type/google.js'
import { DateTime } from 'luxon'
import env from '#start/env'
import NotFoundException from '#exceptions/not_found_exception'
import hash from '@adonisjs/core/services/hash'
import CaptchaService from './captcha.service.js'
import CaptchaException from '#exceptions/captcha_exception'
import UsersService from './users.service.js'

@inject()
export default class AuthsService {
  constructor(
    private tokensService: TokensService,
    private emailsService: EmailsService,
    private captchaService: CaptchaService,
    private usersService: UsersService
  ) {}

  async emailRegister(data: EmailRegister & { roleId?: string }) {
    // check if email is already registered (on users table and auths table)
    const alreadyHasUser = await User.query().where('email', data.email).first()
    const alreadyHasAuth = await Auth.query().where('providerId', data.email).first()
    if (alreadyHasUser || alreadyHasAuth) {
      throw new AlreadyExistException('User already exist')
    }

    // Create user with auth and token for confirm email
    const user = await this.usersService.createUser({
      email: data.email,
      username: data.username,
      roleId: data.roleId ?? roles.user.id,
    })
    await user.related('auths').create({
      id: cuid(),
      providerId: user.email,
      providerName: providers.email,
      password: data.password,
    })

    const token = await this.tokensService.createVerifyToken(user)
    await this.emailsService.sendVerifyEmail(token, user)
    return user
  }

  async verifyEmail(token: string) {
    const user = this.tokensService.verifyEmail(token)
    return user
  }

  async requestResetPassword(data: RequestResetPassword) {
    const auth = await Auth.query()
      .where('provider_name', providers.email)
      .andWhere('provider_id', data.email)
      .firstOrFail()
    const user = await User.query().where('id', auth.userId).firstOrFail()
    const token = await this.tokensService.createResetPasswordToken(auth.userId)
    await this.emailsService.sendResetPasswordEmail(token, user)
  }

  async resetPassword({ token, password }: ResetPassword) {
    const tokenModel = await this.tokensService.verifyResetPassword(token)

    const user = await User.query().where('id', tokenModel.userId).firstOrFail()

    const authProvider = await Auth.query()
      .where('userId', tokenModel.userId)
      .andWhere('providerName', 'email')
      .andWhere('providerId', user.email)
      .firstOrFail()

    authProvider.password = password

    await authProvider.save()
  }

  async googleLogin(googleUser: GoogleUser) {
    const providerAuth = await Auth.query()
      .where('providerId', googleUser.id)
      .andWhere('providerName', providers.google)
      .first()

    if (providerAuth) {
      const user = await User.findOrFail(providerAuth.userId)
      user.lastConnexion = DateTime.now()
      await user.save()
    } else {
      // used to create admin (from env file)
      const defaultAdmins = env.get('DEFAULT_USER_ADMIN') ?? ''
      const roleId = defaultAdmins.includes(googleUser.email) ? roles.admin.id : roles.user.id
      const user = await this.usersService.createUser({
        username: googleUser.name,
        email: googleUser.email,
        roleId,
        emailVerified: true,
      })

      await user.related('auths').create({
        id: cuid(),
        providerId: googleUser.id,
        providerName: providers.google,
      })
    }
    return User.query().where('email', googleUser.email).firstOrFail()
  }

  async emailLogin({ email, password, captcha }: EmailLogin) {
    const authProvider = await Auth.query()
      .where('providerId', email)
      .andWhere('providerName', 'email')
      .first()

    if (!authProvider) {
      throw new NotFoundException('Auth not found')
    }

    // check if user has tried to login more than 1 time
    if (authProvider.nbTry >= 1) {
      // if yes, check if captcha is valid
      if (!captcha) {
        throw new CaptchaException('Captcha not found')
      }
      if (!(await this.captchaService.verifyCaptcha(captcha))) {
        throw new CaptchaException('Captcha is not valid')
      }
    }

    if (!(await hash.verify(authProvider.password, password))) {
      // if password is not valid, increment nbTry
      authProvider.nbTry++
      await authProvider.save()
      throw new NotFoundException('User not found')
    }
    const user = await User.findOrFail(authProvider.userId)

    if (!user.emailVerified) {
      throw new NotFoundException('Email not verified')
    }

    // if user can login, reset nbTry
    if (authProvider.nbTry > 0) {
      authProvider.nbTry = 0
      await authProvider.save()
    }

    return user
  }
}
