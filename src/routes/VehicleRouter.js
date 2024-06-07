const AuthServiceMiddleware = require('../middlewares/AuthServiceMiddleware')
const roles = require('../entities/Roles')
const vehicleRouter = require('express').Router()

const pg = require('pg')



/**router.post('/', AuthServiceMiddleware.execute([roles.ADMIN, roles.MANAGER]), async (req, res) => {
    const controller = req.app.get('RegisterVehicleController')
    controller.execute(req, res)
})**/


vehicleRouter.post('/', async (req, res) => {
    const controller = req.app.get('RegisterVehicleController')
    controller.execute(req, res)
})

vehicleRouter.get('/:vehicleid1/:vehicleid2', async (req, res) => {
    const controller = req.app.get('CompareVehiclesController')
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

vehicleRouter.put('/:vehicleid2', async (req, res) => {
    const controller = req.app.get('EditVehicleController')
    controller.execute(req, res)
})

vehicleRouter.delete('/:vehicleid', async (req, res) => {
    const controller = req.app.get('DeleteVehicleController')
    controller.execute(req, res)
})

vehicleRouter.post("/user/favorites", async(req, res) => {
    try {
    const { userid, vehicleid } = req.body

    if(!userid || !vehicleid) {
        return res.status(400).json({ error: 'All fields are required. It should have userid and vehicleid' })
    }

    const query = `INSERT INTO favorites (userid, vehicleid) VALUES ($1, $2)`

    const values = [userid, vehicleid]

    const pool = new pg.Client(process.env.DATABASE_URL)
    
    await pool.connect()

    await pool.query(query, values)

    await pool.end()

    return res.status(201).json({ message: 'Vehicle added to favorites' })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
    
})

module.exports = vehicleRouter