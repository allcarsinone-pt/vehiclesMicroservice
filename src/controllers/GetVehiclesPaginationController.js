const GetVehiclesPaginationUseCase = require('../usecases/GetVehiclesPagination/GetVehiclesPagination.usecase');

/**
 * @Class GetVehiclesPaginationController
 * @description Controller of GetVehiclePagination
 * */
class GetVehiclesPaginationController {

    constructor(vehicleRepository, logService) {
        this.vehicleRepository = vehicleRepository
        this.logService = logService
    }

    async execute(request, response) {
        let { page } = request.params || {}

        const usecase = new GetVehiclesPaginationUseCase(this.vehicleRepository)

        const vehiclesResult = await usecase.execute(page)

        if (vehiclesResult.error) {
            return response.status(400).json({ error: vehiclesResult.error.message })
        }

        vehiclesResult.data.forEach(async vehicle => {
            await this.logService.execute({ from: 'VehiclesService', data: `Get vehicles paginated`, date: new Date(), status: 'success' }, this.logService);
        });

        return response.status(201).json(vehiclesResult.data);
    }
}

module.exports = GetVehiclesPaginationController