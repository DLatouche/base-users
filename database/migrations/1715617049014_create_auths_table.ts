import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'auths'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').unique().primary()
      table.string('user_id').references('users.id').onDelete('CASCADE')

      table.string('provider_id').notNullable()
      table.string('provider_name').notNullable()
      table.string('password')
      table.integer('nb_try').unsigned().defaultTo(0)
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
