const { Result, handleError } = require('../../util/Result')

class GetBrandsUseCase {

    constructor({ brandRepository }) {
        this.brandRepository = brandRepository
    }

    async execute() {
        const withErrorHandling = handleError(async () => {
            const brands = await this.brandRepository.getBrands()
            if (!brands) {
                return Result.success([]);
            }
            return Result.success(brands);
        });
        return withErrorHandling();
    }
}

module.exports = GetBrandsUseCase