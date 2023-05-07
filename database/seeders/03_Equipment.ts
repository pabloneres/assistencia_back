import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import EquipmentType from 'App/Models/EquipmentType'

export default class extends BaseSeeder {
    public async run() {
        await EquipmentType.createMany([
            {
                name: "Desktop",
                description: "Computador de mesa"
            },
            {
                name: "Notebook",
                description: "Notebook"
            },
            {
                name: "Smartphone",
                description: "Smartphone",
            },
            {
                name: "Tablet",
                description: "Tablet"
            }
        ])
    }
}
