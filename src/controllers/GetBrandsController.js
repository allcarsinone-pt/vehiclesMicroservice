const GetBrandsUseCase = require('../usecases/GetBrandsUseCase/GetBrands.usecase');

/**
 * @Class GetBrandsController
 * @description Controller of GetBrands
 * */
class GetBrandsController {
    constructor(brandRepository) {
        this.brandRepository = brandRepository
    }

    async execute(request, response) {
        const usecase = new GetBrandsUseCase({ brandRepository: this.brandRepository })
        const brands = await usecase.execute()

        if (brands.error) {
            return response.status(400).json({ error: brands.error.message })
        }

        return response.status(200).json(brands.data);

    }
}

module.exports = GetBrandsController