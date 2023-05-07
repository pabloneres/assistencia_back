import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer'

const fieldSearchable = [
    'name',
    'email'
];

export default class CustomersController {
    public async index({request, auth}: HttpContextContract) {
        const search = request.input("search", '')
        const page = request.input("page", 1)
        const limit = request.input("limit", 10)
        const orderBy = request.input("orderBy", 'id:desc').split(':')
        const { user } = auth

        const items = Customer.query()

        if (user) {
            items.where("user_id", user?.id)
        }

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

        const customer = await Customer.findOrFail(id)

        return customer
    }

    public async store(ctx: HttpContextContract) {
        const {
            user_id,
            name,
            phone,
            email,
            zipcode,
            street,
            district,
            uf,
        } = ctx.request.all()

        const customer = await Customer.create({
            user_id,
            name,
            phone,
            email,
            zipcode,
            street,
            district,
            uf,
        })

        return customer
    }

    public async update(ctx: HttpContextContract) {
        const data = ctx.request.all()
        const {id} = ctx.request.params()

        const customer = await Customer.findOrFail(id)

        for (const item in data) {
            customer[item] = data[item]
        }

        await customer.save()

        await customer.refresh()


        return customer
    }
}
