import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tokens'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').unique().primary()
      table.string('user_id').references('id').inTable('users').onDelete('CASCADE')

      table.string('hash').notNullable()
      table.string('type').notNullable()
      table.timestamp('expires_at').nullable()
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
