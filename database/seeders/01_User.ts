import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import { UserFactory } from 'Database/factories'

export default class extends BaseSeeder {
  public async run() {
    await User.create({
      name: "Pablo Neres",
      company_name: "Assistencia Apple",
      active: true,
      email: "assistencia@assistencia.com.br",
      password: "pablo123",
    })

    await UserFactory.createMany(10)
    // Write your database queries inside the run method
  }
}
