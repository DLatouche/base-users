import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').unique().primary()
      table
        .string('role_id')
        .references('id')
        .inTable('roles')
        .onDelete('SET NULL')
        .onUpdate('CASCADE')

      table.boolean('email_verified').defaultTo(false)
      table.string('username').notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('avatar').notNullable().defaultTo('avatar_1')

      table.timestamp('last_connexion', { useTz: true })
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
