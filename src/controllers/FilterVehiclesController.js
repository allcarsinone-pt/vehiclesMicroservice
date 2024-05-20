const FilterVehiclesUseCase = require('../usecases/FilterVehiclesUseCase/FilterVehicles.usecase');

/**
 * @Class FilterVehiclesController
 * @description Controller of GetVehicleDetails
 * */
class FilterVehiclesController {

    constructor(vehicleRepository, logService) {
        this.vehicleRepository = vehicleRepository
        this.logService = logService
    }

    async execute(request, response) {
        let { brandname, model, year, mileage, price, availability, description, gastypename } = request.body || {}

        const usecase = new FilterVehiclesUseCase(this.vehicleRepository)

        const vehiclesResult = await usecase.execute({ brandname, model, year, mileage, price, availability, description, gastypename })

        if (vehiclesResult.error) {
            return response.status(400).json({ error: vehiclesResult.error.message })
        }

        vehiclesResult.data.forEach(async vehicle => {
            await this.logService.execute({ from: 'VehiclesService', data: `Get vehicles filtered`, date: new Date(), status: 'success' }, this.logService);
        });

        return response.status(201).json(vehiclesResult.data);
    }
}

module.exports = FilterVehiclesController