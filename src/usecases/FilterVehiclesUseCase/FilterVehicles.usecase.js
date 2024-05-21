const Vehicle = require('../../entities/Vehicle')
const { Result, handleError } = require('../../util/Result')

class FilterVehiclesUseCase {
    /**
     * @description Constructor of FilterVehiclesUseCase
     * @param {*} vehicleRepository a vehicleRepository
     */
    constructor(vehicleRepository) {
        this.vehicleRepository = vehicleRepository
    }

    async execute(brandname, model, year, mileage, price, availability, description, gastypename) {
        const withErrorHandling = handleError(async () => {
            const vehicles = await this.vehicleRepository.getVehiclesFilter(brandname, model, year, mileage, price, availability, description, gastypename);

            if (!vehicles) {
                return Result.success([]);
            }

            return Result.success(vehicles);
        });

        return withErrorHandling();
    }
}

module.exports = FilterVehiclesUseCase