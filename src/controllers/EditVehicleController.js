const EditVehicleUseCase = require('../usecases/EditVehicleUseCase/EditVehicle.usecase')

class EditVehicleController {
    /**
     * Constructor of EditVehicleController
     * @param {*} vehicleRepository a vehicleRepository 
     * @param {*} logService a logService
     */
    constructor(vehicleRepository, logService) {
        this.vehicleRepository = vehicleRepository
        this.logService = logService
    }

    async execute(request, response) {
        let { vehicleid } = request.params
        let { standid, brandid, gastypeid, model, year, mileage, price, availability, description, consume } = request.body || {}
        if (!vehicleid || !standid || !brandid || !gastypeid || !model || !year || !mileage || !price || !availability || !description || !consume) {
            await this.logService.execute({ from: 'VehiclesService', data: 'Missing fields', date: new Date(), status: 'error' }, this.logService)
            return response.status(400).json({ error: 'All fields are required. It should have vehicleid, standid, brandid, gastypeid, model, year, mileage, price, availability, description, consume' })
        }

        const usecase = new EditVehicleUseCase(this.vehicleRepository)
        const vehicle = await usecase.execute({ vehicleid, standid, brandid, gastypeid, model, year, mileage, price, availability, description, consume })

        if (vehicle.error) {
            await this.logService.execute({ from: 'VehiclesService', data: vehicle.error.message, date: new Date(), status: 'error' }, this.logService)
            return response.status(400).json({ error: vehicle.error.message })
        }

        await this.logService.execute({ from: 'VehiclesService', data: `Vehicle ${vehicle.data.vehicleid} edited`, date: new Date(), status: 'success' }, this.logService)
        return response.status(200).json(vehicle.data)
    }
}

module.exports = EditVehicleController