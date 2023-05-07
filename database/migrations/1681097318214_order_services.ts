import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'order_services'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('os').unique()

      table.integer("customer_id").references("id").inTable("customers").unsigned().notNullable().onDelete("CASCADE").onUpdate("CASCADE")

      table.integer("equipment_type_id").references("id").inTable("equipment_types").notNullable()

      table.string("brand")
      table.string("serial_number")
      table.string("model")

      table.string("description_customer")

      table.float("value", 8, 2)

      table.string("comments")

      table.boolean("approved")

      table.timestamp("forecast", { useTz: true })

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
