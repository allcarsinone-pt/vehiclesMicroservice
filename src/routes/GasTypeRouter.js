const AuthServiceMiddleware = require('../middlewares/AuthServiceMiddleware')
const roles = require('../entities/Roles')
const gastypeRouter = require('express').Router()

gastypeRouter.get('/', async (req, res) => {
    const controller = req.app.get('GetGasTypesController')
    controller.execute(req, res)
})

gastypeRouter.post('/', async (req, res) => {
    const controller = req.app.get('RegisterGasTypeController')
    controller.execute(req, res)
})

gastypeRouter.put('/', async (req, res) => {
    const controller = req.app.get('EditGasTypeController')
    controller.execute(req, res)
})

gastypeRouter.delete('/:gastypeid', async (req, res) => {
    const controller = req.app.get('DeleteGasTypeController')
    controller.execute(req, res)
})

module.exports = gastypeRouter