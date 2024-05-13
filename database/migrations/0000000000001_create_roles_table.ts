import { BaseSchema } from '@adonisjs/lucid/schema'
import { roles } from '../../enums/roles.js'

export default class extends BaseSchema {
  protected tableName = 'roless'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').unique().primary()
      table.string('name').notNullable()
      table.timestamp('updated_at')
    })
    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        { name: roles.admin.name, id: roles.admin.id },
        { name: roles.user.name, id: roles.user.id },
      ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
