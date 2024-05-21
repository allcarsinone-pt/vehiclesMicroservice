const AuthServiceMiddleware = require('../middlewares/AuthServiceMiddleware')
const roles = require('../entities/Roles')
const vehicleRouter = require('express').Router()





/**router.post('/', AuthServiceMiddleware.execute([roles.ADMIN, roles.MANAGER]), async (req, res) => {
    const controller = req.app.get('RegisterVehicleController')
    controller.execute(req, res)
})**/


vehicleRouter.post('/', async (req, res) => {
    const controller = req.app.get('RegisterVehicleController')
    controller.execute(req, res)
})




vehicleRouter.get('/:vehicleId', async (req, res) => {
    const controller = req.app.get('GetVehicleDetailsController')
    controller.execute(req, res)
})

vehicleRouter.get('/', async (req, res) => {
    const controller = req.app.get('FilterVehiclesController')
    controller.execute(req, res)
})

vehicleRouter.put('/edit', async (req, res) => {
    const controller = req.app.get('EditVehicleController')
    controller.execute(req, res)
})

vehicleRouter.delete('/:vehicleid', async (req, res) => {
    const controller = req.app.get('DeleteVehicleController')
    controller.execute(req, res)
})

module.exports = vehicleRouter