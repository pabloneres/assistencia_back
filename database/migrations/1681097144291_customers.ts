import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'customers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer("user_id").references("id").inTable("users").unsigned().notNullable().onDelete("CASCADE").onUpdate("CASCADE")
      table.string("name").notNullable()
      table.string("phone")
      table.string("email")
      table.string("zipcode")
      table.string("street")
      table.string("district")
      table.boolean("is_active").defaultTo(true)
      table.string("uf")

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
