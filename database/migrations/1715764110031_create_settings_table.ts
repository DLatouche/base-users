import User from '#models/user'
import { cuid } from '@adonisjs/core/helpers'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'settings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').unique().primary()
      table
        .string('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.string('theme').notNullable().defaultTo('theme-blue')
      table.boolean('menu_expanded').notNullable().defaultTo(true)
      table.timestamp('updated_at')
    })

    this.defer(async (db) => {
      const users = await User.all()
      if (users.length > 0)
        await db.table(this.tableName).multiInsert(
          users.map((user) => ({
            id: cuid(),
            user_id: user.id,
            theme: 'theme-blue',
            menu_expanded: true,
            updated_at: new Date(),
          }))
        )
    })
  }

  async down() {
    this.schema.dropTableIfExists(this.tableName)
  }
}
