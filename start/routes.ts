/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
    return { hello: 'world' }
})

Route.group(() => {
    Route.post("/", "UsersController.store")
}).prefix("users")

Route.group(() => {
    Route.post("/login", "AuthController.login")
    Route.get("/user", "AuthController.show").middleware("auth")
}).prefix("auth")

Route.group(() => {
    Route.get("/", "CustomersController.index")
    Route.get("/:id", "CustomersController.show")
    Route.put("/:id", "CustomersController.update")
}).prefix("customer").middleware("auth")

Route.group(() => {
    Route.get("/", "OrderServicesController.index")
    Route.get("/:id", "OrderServicesController.show")
    Route.put("/:id", "OrderServicesController.update")
    Route.post("/", "OrderServicesController.store")
    Route.delete("/:id", "OrderServicesController.destroy")
}).prefix("order").middleware("auth")

Route.group(() => {
    Route.get("/", "EquipmentTypesController.index")
    Route.post("/", "EquipmentTypesController.store")
}).prefix("equipment_type").middleware("auth")

Route.group(() => {
    Route.get("/", "DashboardController.index")
}).prefix("dashboard").middleware("auth")
