import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Token extends BaseModel {
  @column({ isPrimary: true }) declare id: string

  @column() declare userId: string

  @column() declare hash: string
  @column() declare type: string

  @column.dateTime() declare expiresAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true }) declare updatedAt: DateTime | null

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
