const AuthServiceMiddleware = require('../middlewares/AuthServiceMiddleware')
const roles = require('../entities/Roles')
const brandRouter = require('express').Router()

brandRouter.get('/', async (req, res) => {
    const controller = req.app.get('GetBrandsController')
    controller.execute(req, res)
})

brandRouter.post('/', async (req, res) => {
    const controller = req.app.get('RegisterBrandController')
    controller.execute(req, res)
})

brandRouter.put('/', async (req, res) => {
    const controller = req.app.get('EditBrandController')
    controller.execute(req, res)
})

brandRouter.delete('/:brandid', async (req, res) => {
    const controller = req.app.get('DeleteBrandController')
    controller.execute(req, res)
})

module.exports = brandRouter