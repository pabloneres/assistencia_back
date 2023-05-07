import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { CustomerFactory } from 'Database/factories'

export default class extends BaseSeeder {
  public async run() {
    await CustomerFactory.createMany(50)
    // Write your database queries inside the run method
  }
}
