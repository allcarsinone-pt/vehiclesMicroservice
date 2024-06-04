const CompareVehiclesUseCase = require('../usecases/CompareVehiclesUseCase/CompareVehicles.usecase');

/**
 * @Class CompareVehiclesController
 * @description Controller of CompareVehicles
 * */
class CompareVehiclesController {

    constructor(vehicleRepository, fuelService) {
        this.vehicleRepository = vehicleRepository
        this.fuelService = fuelService
    }

    async execute(request, response) {
        let { vehicleid1, vehicleid2 } = request.params || {}

        vehicleid1 = parseInt(vehicleid1)
        vehicleid2 = parseInt(vehicleid2)
        if(!vehicleid1 || !vehicleid2) {
            
            return response.status(400).json({ error: 'All fields are required. It should have vehicleid1 and vehicleid2' })
        }

        const usecase = new CompareVehiclesUseCase(this.vehicleRepository, this.fuelService)
        const vehicle = await usecase.execute(vehicleid1, vehicleid2)

        if(vehicle.error) {
            
            return response.status(400).json({ error: vehicle.error.message })
        }

        return response.status(200).json(vehicle.data)
    }
}

module.exports = CompareVehiclesController