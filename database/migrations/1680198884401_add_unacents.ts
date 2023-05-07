import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up () {
      this.raw('CREATE EXTENSION IF NOT EXISTS unaccent')
  }

  public async down () {
      this.raw('DROP EXTENSION IF EXISTS unaccent')
  }
}
