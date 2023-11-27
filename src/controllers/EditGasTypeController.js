const EditGasTypeUseCase = require('../usecases/EditGasTypeUseCase/EditGasType.usecase')

/**
 * @class EditGasTypeController
 * @description Controller of EditGasTypeUseCase
 */
class EditGasTypeController {
    /**
     * @description Constructor of EditGasTypeController
     * @param {*} gasTypeRepository a gasTypeRepository
     */
    constructor (gasTypeRepository) {
        this.gasTypeRepository = gasTypeRepository
    }

    async execute(request, response) {
        let { gastypeid, name } = request.body || {}

        if(!gastypeid || !name) {
            await LogService.execute({from: 'VehiclesService', data: 'Missing fields', date: new Date(), status: 'error'}, this.logService)
            return response.status(400).json({ error: 'All fields are required. It should have gastypeid, name' })
        }

        const usecase = new EditGasTypeUseCase(this.gasTypeRepository)
        const gasType = await usecase.execute({gastypeid, name})

        if(gasType.error) {
            await LogService.execute({from: 'VehiclesService', data: gasType.error.message, date: new Date(), status: 'error'}, this.logService)
            return response.status(400).json({ error: gasType.error.message })
        }

        return response.status(200).json(gasType.data)
    }
}

module.exports = EditGasTypeController