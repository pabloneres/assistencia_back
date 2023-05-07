import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Customer from './Customer'
import EquipmentType from './EquipmentType'

export default class OrderService extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public customer_id: number

  @column()
  public os: string

  @column()
  public equipment_type_id: number

  @column()
  public brand: string

  @column()
  public serial_number: string

  @column()
  public model: string

  @column()
  public description_customer: string

  @column()
  public value: number

  @column()
  public comments: string

  @column()
  public approved: boolean

  @column()
  public forecast: string

  @belongsTo(() => Customer, {
    foreignKey: "customer_id"
  })
  public customer: BelongsTo<typeof Customer>

  @belongsTo(() => EquipmentType, {
    foreignKey: "equipment_type_id"
  })
  public equipment_type: BelongsTo<typeof EquipmentType>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
