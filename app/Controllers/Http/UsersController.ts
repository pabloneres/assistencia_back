import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
    public async store(ctx: HttpContextContract) {
        const {
            name,
            company_name,
            active,
            email,
            password,
        } = ctx.request.all()

        const user = await User.create({
            name,
            company_name,
            active,
            email,
            password,
        })

        return user
    }
}
