import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EquipmentType from 'App/Models/EquipmentType'

export default class EquipmentTypesController {
    public async index() {
        const equipments = await EquipmentType.all()

        return equipments
    }

    public async store(ctx: HttpContextContract) {
        const {
            name,
            description
        } = ctx.request.all()

        const equipment = await EquipmentType.create({
            name,
            description
        })

        return equipment
    }
}
