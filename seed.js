const { configDotenv, config } = require('dotenv')
const Vehicle = require('./src/entities/Vehicle')
const Brand = require('./src/entities/Brand')
const GasType = require('./src/entities/GasType')
const PostgreVehicleRepository = require('./src/repositories/PostgreVehicleRepository')
const PostgreBrandRepository = require('./src/repositories/PostgreBrandRepository')
const PostgreGasTypeRepository = require('./src/repositories/PostgreGasTypeRepository')

config()

const main = async () => {
    const vehicles = []
    const brands = []
    const gastypes = []

    for (let i = 0; i < 20; i++) {
        const gastype = new GasType(`Gas Type ${i}`)
        gastypes.push(gastype)
    }

    const gastypeRepository = new PostgreGasTypeRepository(process.env.DATABASE_URL)

    for (let i = 0; i < gastypes.length; i++) {
        await gastypeRepository.create(gastypes[i])
    }

    for (let i = 0; i < 100; i++) {
        const brand = new Brand(`Brand ${i}`)
        brands.push(brand)
    }
    const brandRepository = new PostgreBrandRepository(process.env.DATABASE_URL)

    for (let i = 0; i < brands.length; i++) {
        await brandRepository.create(brands[i])
    }

    const locations = ['Esposende', 'Braga', 'Porto', 'Instituto Politécnico do Cávado e do Ave', 'Lisboa', 'Barcelos',
        'Madeira', 'Açores', 'Viseu', 'São João da Madeira', 'Faro', 'Guarda', 'Leiria', 'Castelo Branco',
        'Portalegre', 'Covilha', 'Viana do Castelo', 'Vila Real', 'Figueira da Foz', 'Ponta Delgada',
    ]
    for (let i = 0; i < 1000; i++) {
        let vehicle = {}
        vehicle.brandid = Math.floor(100 * Math.random())
        vehicle.standid = Math.floor(100 * Math.random())
        vehicle.gastypeid = Math.floor(4 * Math.random())
        vehicle.model = `Model ${i}`
        vehicle.year = Math.floor(Math.random() * 2024)
        vehicle.mileage = Math.floor(Math.random() * 1000000)
        vehicle.price = Math.floor(Math.random() * 1000000)
        vehicle.description = `Description ${i}`
        vehicle.consume = Math.floor(Math.random() * 100)
        vehicle.deleted = false
        vehicle.availability = !!(Math.random() > 0.5)
        vehicle.location = locations[Math.floor(Math.random() * locations.length)]
        vehicle.photos = []
        vehicles.push(vehicle)
    }


    const vehicleRepository = new PostgreVehicleRepository(process.env.DATABASE_URL)

    for (let i = 0; i < vehicles.length; i++) {
        await vehicleRepository.create(vehicles[i])
    }

}

main()