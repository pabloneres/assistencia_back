import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'
import Customer from 'App/Models/Customer'

export const UserFactory = Factory
    .define(User, ({ faker }) => {
        return {
            name: faker.name.fullName(),
            company_name: faker.company.name(),
            active: true,
            email: faker.internet.email(),
            password: faker.internet.password(),
        }
    })
    .build()


export const CustomerFactory = Factory
    .define(Customer, ({ faker }) => {
        return {
            user_id: 1,
            name: faker.name.fullName(),
            phone: faker.phone.number(),
            email: faker.internet.email(),
            zipcode: faker.address.zipCode(),
            street: faker.address.street(),
            district: faker.address.city(),
            uf: faker.address.state(),
        }
    })
    .build()