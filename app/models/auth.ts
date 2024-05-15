import { DateTime } from 'luxon'
import { BaseModel, beforeSave, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import hash from '@adonisjs/core/services/hash'

export default class Auth extends BaseModel {
  @column({ isPrimary: true }) declare id: string

  @column() declare userId: string
  @column() declare providerId: string
  @column() declare providerName: string

  @column({ serializeAs: null }) declare password: string

  @column() declare nbTry: number

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @beforeSave()
  static async hashPassword(auth: Auth) {
    if (auth.$dirty.password) {
      auth.password = await hash.make(auth.password)
    }
  }
}
