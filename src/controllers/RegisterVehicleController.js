const RegisterVehicleUseCase = require('../usecases/RegisterVehicleUseCase/RegisterVehicle.usecase');

/**
 * @Class RegisterVehicleController
 * @description Controller of RegisterVehicle
 */
class RegisterVehicleController {
    constructor(vehicleRepository, logService) {
        this.vehicleRepository = vehicleRepository
        this.logService = logService
    }

    async execute(request, response) {

        let multerMiddleware = request.app.get('multerMiddleware')

        const vehicleRepository = this.vehicleRepository
        const logService = this.logService

        multerMiddleware(request, response, async function(err) {
            if(err) {
                //await this.logService.execute('VehiclesService', err, 'error')
                return response.status(400).json({ error: err })
            }

            console.log(request.body)
            let { standid, brandid, gastypeid, model, year, mileage, price, availability, description } = request.body

            if(!availability) {
                availability = 1
            }
            if(!standid || !brandid || !gastypeid || !model || !year || !mileage || !price  || !description) {
                //await this.logService.execute('VehiclesService','Missing fields','error')
                return response.status(400).json({ error: 'All fields are required. It should have standid, brandid, gastypeid, model, year, mileage, price, availability, description' })
            }

            const usecase = new RegisterVehicleUseCase(vehicleRepository)
            
            const photos = request.files.map((file) => `/photos/${file.filename}`)
            console.log(photos)
            const vehicle = await usecase.execute({standid, brandid, gastypeid, model, year, mileage, price, availability, description, photos})

            if(vehicle.error) {
                //await this.logService.execute('VehiclesService', vehicle.error.message, 'error')
                return response.status(400).json({ error: vehicle.error.message })
            }

            //await this.logService.execute('VehiclesService', `Vehicle ${vehicle.data.model} created`, 'success')
            return response.status(201).json(vehicle.data)
        })
    }
}

module.exports = RegisterVehicleController