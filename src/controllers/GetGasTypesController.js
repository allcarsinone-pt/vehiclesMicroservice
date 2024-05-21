const GetGasTypesUseCase = require('../usecases/GetGasTypesUseCase/GetGasTypes.usecase');

/**
 * @Class GetGasTypesController
 * @description Controller of GetGasTypes
 * */
class GetGasTypesController {
    constructor(gasTypeRepository) {
        this.gasTypeRepository = gasTypeRepository
    }

    async execute(request, response) {
        const usecase = new GetGasTypesUseCase(this.gasTypeRepository)
        const gasTypes = await usecase.execute()

        if (gasTypes.error) {
            return response.status(400).json({ error: gasTypes.error.message })
        }

        return response.status(200).json(gasTypes.data);

    }
}

module.exports = GetGasTypesController
