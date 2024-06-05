const Vehicle = require('../../entities/Vehicle')
const { Result, handleError } = require('../../util/Result')

class CompareVehiclesUseCase {
    /**
     * @description Constructor of CompareVehiclesUseCase
     * @param {*} vehicleRepository a vehicleRepository
     */
    constructor(vehicleRepository, fuelService) {
        this.vehicleRepository = vehicleRepository
        this.fuelService = fuelService
    }

    async compare(vehicle1, vehicle2) {
        // dados veiculo, gastypename, brandname
        /**
         * {
         *    vehicle1,
         *    vehicle2,
         *    best_details: {
         *         year: vehicle1.id
         *         price: vehicle2.id
         *         mileage: vehicle1.id
         *    }  
         * }
         */

        // dados veiculo, gastypename, brandname
        const response = {vehicle1, vehicle2, best_details: {}}

        if(vehicle1.year > vehicle2.year) {
            response.best_details.year = vehicle1.id
        }
        else if(vehicle1.year < vehicle2.year) {
            response.best_details.year = vehicle2.id
        }
        else {
            response.best_details.year = 0
        }

        if(vehicle1.price < vehicle2.price) {
            response.best_details.price = vehicle1.id
        }
        else if(vehicle1.price > vehicle2.price) {
            response.best_details.price = vehicle2.id
        }
        else {
            response.best_details.price = 0
        }

        if(vehicle1.mileage < vehicle2.mileage) {
            response.best_details.mileage = vehicle1.id
        }
        else if(vehicle1.mileage > vehicle2.mileage) {
            response.best_details.mileage = vehicle2.id
        }
        else {
            response.best_details.mileage = 0
        }
        
        if(vehicle1.gastypename === vehicle2.gastypename) {
            if(vehicle1.consume < vehicle2.consume) {
                response.best_details.consume = vehicle1.id
            }
            else if(vehicle1.consume === vehicle2.consume) {
                response.best_details.consume = 0
            }
            else {
                response.best_details.consume = vehicle2.id
            }
        }
        else {
            const fuelPrices = await this.fuelService.execute()
            if(!fuelPrices) {
                throw new Error("Error on fuel service")
            }
            
            let averagePrice1  = 0
            let averagePrice2  = 0

            if(vehicle1.gastypename === "Gasoline") {
                console.log(fuelPrices[2].preco)
                averagePrice1 = vehicle1.consume * fuelPrices[2].preco 
            
            }
            else if(vehicle1.gastypename === "Diesel") {
                averagePrice1 = vehicle1.consume * fuelPrices[0].preco
            }

            if(vehicle2.gastypename === "Gasoline") {
                console.log(fuelPrices[2].preco)
                averagePrice2 = vehicle2.consume * fuelPrices[2].preco 
            }
            else if(vehicle2.gastypename === "Diesel") {
                averagePrice2 = vehicle2.consume * fuelPrices[0].preco
            }

            console.log({averagePrice1, averagePrice2})
            response.best_details.consume = averagePrice1 < averagePrice2? vehicle1.id : vehicle2.id
        }

        return response


    }
    async execute(vehicleid1, vehicleid2) {
        const withErrorHandling = handleError(async () => {
            if (!vehicleid1 || !vehicleid2) {
                return Result.failed(new Error('Missing fields'))
            }
            const vehicle1 = await this.vehicleRepository.getVehicleDetails(vehicleid1)
            const vehicle2 = await this.vehicleRepository.getVehicleDetails(vehicleid2)

            if (!vehicle1 || !vehicle2) {
                return Result.failed(new Error('One of the vehicles doesnt exists'))
            }

            const comparison = await this.compare(vehicle1, vehicle2)

            return Result.success(comparison)
        })
        return withErrorHandling()
    }
}

module.exports = CompareVehiclesUseCase