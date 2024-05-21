const { Result, handleError } = require('../../util/Result')

class GetGasTypesUseCase {

    constructor(gasTypeRepository) {
        this.gasTypeRepository = gasTypeRepository
    }

    async execute() {
        const withErrorHandling = handleError(async () => {
            const gasTypes = await this.gasTypeRepository.getGasTypes()
            if (!gasTypes) {
                return Result.success([]);
            }
            return Result.success(gasTypes);
        });
        return withErrorHandling();
    }
}

module.exports = GetGasTypesUseCase