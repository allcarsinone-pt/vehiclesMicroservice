const Vehicle = require('../../entities/Vehicle')
const { Result, handleError } = require('../../util/Result')

class EditVehicleUseCase {
    /**
     * @description Constructor of EditVehicleUseCase
     * @param {*} vehicleRepository a vehicleRepository
     */
    constructor(vehicleRepository) {
        this.vehicleRepository = vehicleRepository
    }

    async execute(editVehicleDto) {
        const withErrorHandling = handleError(async () => {
            const vehicleExists = await this.vehicleRepository.findByID(editVehicleDto.vehicleid)
            if (!vehicleExists) {
                return Result.failed(new Error('Vehicle doesnt exists'))
            }
            let vehicle = await this.vehicleRepository.editVehicle(editVehicleDto)
            return Result.success(vehicle.toJson())
        })
        return withErrorHandling()
    }
}

module.exports = EditVehicleUseCase