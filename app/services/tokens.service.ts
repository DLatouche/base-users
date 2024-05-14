import Token from '#models/token'
import User from '#models/user'
import { cuid } from '@adonisjs/core/helpers'
import { DateTime } from 'luxon'
import { tokens } from '../../enums/tokens.js'
import stringHelpers from '@adonisjs/core/helpers/string'

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
}
