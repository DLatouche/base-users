import Token from '#models/token'
import User from '#models/user'
import { cuid } from '@adonisjs/core/helpers'
import { DateTime } from 'luxon'
import { tokens } from '../../enums/tokens.js'
import stringHelpers from '@adonisjs/core/helpers/string'
import NotFoundException from '#exceptions/not_found_exception'

export default class TokensService {
  async createVerifyToken(user: User, trx: any = null) {
    const token = await Token.create(
      {
        id: cuid(),
        userId: user.id,
        type: tokens.verifyEmail,
        expiresAt: DateTime.now().plus({ hours: 24 }),
        hash: stringHelpers.random(64),
      },
      { client: trx }
    )

    return token
  }

  async verifyEmail(token: string) {
    const tokenModel = await Token.query()
      .where('hash', token)
      .where('type', tokens.verifyEmail)
      .where('expiresAt', '>', DateTime.now().toISO())
      .first()

    if (!tokenModel) {
      throw new NotFoundException('Token not found')
    }

    const user = await User.findOrFail(tokenModel.userId)
    user.emailVerified = true
    await user.save()
    await tokenModel.delete()

    return user
  }
}
