const Vehicle = require('../../entities/Vehicle')
const { Result, handleError } = require('../../util/Result')

class GetVehicleDetailsUseCase {
    /**
     * @description Constructor of GetVehicleDetailsUseCase
     * @param {*} vehicleRepository a vehicleRepository
     */
    constructor(vehicleRepository) {
        this.vehicleRepository = vehicleRepository
    }

    async execute(vehicleid) {
        const withErrorHandling = handleError(async () => {
            if (!vehicleid) {
                return Result.failed(new Error('Missing fields'))
            }
            const vehicle = await this.vehicleRepository.getVehicleDetails(vehicleid)

            if (!vehicle) {
                return Result.failed(new Error('Vehicle doesnt exists'))
            }

            return Result.success(vehicle.toJson())
        })
        return withErrorHandling()
    }
}

module.exports = GetVehicleDetailsUseCase