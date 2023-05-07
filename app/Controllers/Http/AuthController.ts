import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
    public async login(ctx: HttpContextContract) {
        const {
            email,
            password,
        } = ctx.request.all()


        try {
            const token = await ctx.auth.use('api').attempt(email, password)
            return token
        } catch {
            return ctx.response.unauthorized('Credenciais invalidas')
        }

    }

    public async show(ctx: HttpContextContract) {
        const { user } = ctx.auth

        const userData = await User.findByOrFail("id", user?.id)

        return userData
    }
}
