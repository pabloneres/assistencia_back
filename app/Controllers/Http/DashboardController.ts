import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class DashboardController {
    public async index({auth}: HttpContextContract) {
        const { user } = auth

        let orders
        let customers

        if (user) {
           [orders] = await Database
            .from("order_services")
            .join("customers", (query) => {
                query.on("order_services.customer_id", "customers.id")
                .andOnVal("customers.user_id", user?.id)
            })
            .count("* as total_order")

        }

        if (user) {
            [customers] = await Database
            .from("customers")
            .where("customers.user_id", user?.id)
            .count("* as total_customer")
        }

        return {...orders, ...customers}
    }
}
