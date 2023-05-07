import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import OrderService from 'App/Models/OrderService'

const fieldSearchable = [
    'os',
    "brand",
    "model",
    "serial_number"
];


export default class OrderServicesController {
    public async index({request, auth}: HttpContextContract) {
        const search = request.input("search", '')
        const page = request.input("page", 1)
        const limit = request.input("limit", 10)
        const orderBy = request.input("orderBy", 'id:desc').split(':')
        const { user } = auth

        const items = OrderService.query()

        if(user) {
            items.preload("customer", (builder) => {
                builder.where("user_id", user?.id)
            })
        }

        items.preload("equipment_type")

        if (search) {
            items.where((builder) => {
                for (const field of fieldSearchable) {
                    builder.orWhereRaw(`unaccent(${field}) ILIKE ?`, ['%' + search + '%'])
                }
            })
        }

        if (orderBy) {
            items.orderBy(orderBy[0], orderBy[1])
        }

        return await items.paginate(page, limit)
    }

    public async show(ctx: HttpContextContract) {
        const {
           id
        } = ctx.request.params()

        const orders = await OrderService.findOrFail(id)

        return orders
    }

    public async store(ctx: HttpContextContract) {
        const {
            customer_id,
            equipment_type_id,
            brand,
            serial_number,
            model,
            description_customer,
            value,
            comments,
            approved,
            forecast,
        } = ctx.request.all()


        const query = `SELECT * FROM order_services ORDER BY id DESC LIMIT 1`;

        const last_order = await Database.rawQuery(query);

        const order = await OrderService.create({
            os: String(parseInt(last_order.rows[0].os) + 1),
            customer_id,
            equipment_type_id,
            brand,
            serial_number,
            model,
            description_customer,
            value,
            comments,
            approved,
            forecast,
        })

        return order
    }

    public async update(ctx: HttpContextContract) {
        const data = ctx.request.all()
        const {id} = ctx.request.params()

        const orders = await OrderService.findOrFail(id)

        for (const item in data) {
            orders[item] = data[item]
        }

        await orders.save()

        await orders.refresh()


        return orders
    }

    public async destroy(ctx: HttpContextContract) {
        const {id} = ctx.request.params()

        const order = await OrderService.findOrFail(id)

        await order.delete()

        return order
    }
}
