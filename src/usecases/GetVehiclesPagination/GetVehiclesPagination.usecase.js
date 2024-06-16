const Vehicle = require('../../entities/Vehicle')
const { Result, handleError } = require('../../util/Result')

class GetVehiclesPaginationUseCase {
    /**
     * @description Constructor of GetVehiclesPaginationUseCase
     * @param {*} vehicleRepository a vehicleRepository
     */
    constructor(vehicleRepository) {
        this.vehicleRepository = vehicleRepository
    }

    async execute(page) {
        const withErrorHandling = handleError(async () => {
            const vehicles = await this.vehicleRepository.getVehiclesPaginated(page);

            if (!vehicles) {
                return Result.success([]);
            }

            return Result.success(vehicles);
        });

        return withErrorHandling();
    }
}

module.exports = GetVehiclesPaginationUseCase