import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, belongsTo, column, computed, hasMany, hasOne } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import Role from './role.js'
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import { roles } from '../../enums/roles.js'
import Auth from './auth.js'
import Setting from './setting.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true }) declare id: string

  @column() declare roleId: string

  @column() declare emailVerified: boolean
  @column() declare username: string
  @column() declare email: string
  @column() declare avatar: string

  @column.dateTime() declare lastConnexion: DateTime | null

  @column.dateTime({ autoCreate: true, autoUpdate: true }) declare updatedAt: DateTime | null

  @computed()
  get isAdmin() {
    return this.roleId === roles.admin.id
  }

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  @hasMany(() => Auth)
  declare auths: HasMany<typeof Auth>

  @hasOne(() => Setting)
  declare settings: HasOne<typeof Setting>
}
