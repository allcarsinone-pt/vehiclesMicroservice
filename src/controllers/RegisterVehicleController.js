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

        let { standid, brandid, gastypeid, model, year, mileage, price, availability, description } = request.body

        if(!standid || !brandid || !gastypeid || !model || !year || !mileage || !price || !availability || !description) {
            await this.logService.execute('VehiclesService','Missing fields','error')
            return response.status(400).json({ error: 'All fields are required. It should have standid, brandid, gastypeid, model, year, mileage, price, availability, description' })
        }

        multerMiddleware(request, response, async function(err) {
            if(err) {
                await this.logService.execute('VehiclesService', err, 'error')
                return response.status(400).json({ error: err })
            }

            const usecase = new RegisterVehicleUseCase(this.vehicleRepository)
            const vehicle = await usecase.execute({standid, brandid, gastypeid, model, year, mileage, price, availability, description})

            if(vehicle.error) {
                await this.logService.execute('VehiclesService', vehicle.error.message, 'error')
                return response.status(400).json({ error: vehicle.error.message })
            }

            await this.logService.execute('VehiclesService', `Vehicle ${vehicle.data.model} created`, 'success')
            return response.status(201).json(vehicle.data)
        })

        
    }
}

module.exports = RegisterVehicleController