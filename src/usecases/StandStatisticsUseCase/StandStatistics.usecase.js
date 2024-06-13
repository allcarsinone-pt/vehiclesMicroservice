const Vehicle = require('../../entities/Vehicle')
const { Result, handleError } = require('../../util/Result')

class StandStatisticsUseCase {
    /**
     * @description Constructor of StandStatisticsUseCase
     * @param {*} vehicleRepository a vehicleRepository
     */
    constructor(vehicleRepository) {
        this.vehicleRepository = vehicleRepository
    }

    async execute(standid) {
        const withErrorHandling = handleError(async () => {
            if (!standid) {
                return Result.failed(new Error('Missing standid'))
            }
            const stand = await this.vehicleRepository.getStandDetails(standid)

            return Result.success(stand)
        })
        return withErrorHandling()
    }
}

module.exports = StandStatisticsUseCase