const StandStatisticsUseCase = require('../usecases/StandStatisticsUseCase/StandStatistics.usecase');

/**
 * @Class RegisterGasTypeController
 * @description Controller of RegisterGasType
 * */
class StandStatisticsController {

    constructor(vehicleRepository, logService) {
        this.vehicleRepository = vehicleRepository
        this.logService = logService
    }

    async execute(request, response) {
        let { standid } = request.params

        if (!standid) {
            return response.status(400).json({ error: 'All fields are required. It should have standid' })
        }

        standid = parseInt(standid)

        const usecase = new StandStatisticsUseCase(this.vehicleRepository)
        const statistics = await usecase.execute(standid)

        if (statistics.error) {
            return response.status(400).json({ error: statistics.error.message })
        }

        return response.status(200).json(statistics.data)
    }
}

module.exports = StandStatisticsController