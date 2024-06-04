const makeApp = require('./src/appBuilder')
const dotenv = require('dotenv')
const PostgreVehicleRepository = require('./src/repositories/PostgreVehicleRepository')
const PostgreGasTypeRepository = require('./src/repositories/PostgreGasTypeRepository')
const PostgreBrandRepository = require('./src/repositories/PostgreBrandRepository')
const LogMockAdapter = require('./src/adapters/LogMockAdapter')
const AxiosAuthServiceAdapter = require('./src/adapters/AxiosAuthServiceAdapter')
const StandMockAdapter = require('./src/adapters/StandMockAdapter');
const RabbitMQAdapter = require('./src/adapters/RabbitMQAdapter')
const UpdateAvailabilityUseCase = require('./src/usecases/UpdateAvailabilityUseCase/UpdateAvailability.usecase')
const DeleteAllVehiclesByStandUseCase = require('./src/usecases/DeleteAllVehiclesByStand/DeleteAllVehiclesByStand.usecase')
const ElasticLogService = require('./src/controllers/services/ElasticLogService')
const RabbitMockAdapter = require('./src/adapters/RabbitMockAdapter')
const MockAuthServiceAdapter = require('./src/adapters/MockAuthServiceAdapter')
const PostgreTestDriveRepository = require('./src/repositories/PostgresTestDriveRepository')
const DGEGGateway = require('./src/adapters/DGEGGateway')

dotenv.config()

/**
 * Define DATABASE_URL and GATEWAY URI in .env file and kubernetes deployment
 */
const vehicleRepository = new PostgreVehicleRepository(process.env.DATABASE_URL)
const gasTypeRepository = new PostgreGasTypeRepository(process.env.DATABASE_URL)
const brandRepository = new PostgreBrandRepository(process.env.DATABASE_URL)
const logAdapter = new LogMockAdapter()
const authService = new MockAuthServiceAdapter()
const standService= new StandMockAdapter()
const rabbitMQAdapter = new RabbitMockAdapter()
const testDriveRepository = new PostgreTestDriveRepository(process.env.DATABASE_URL)
const fuelService = new DGEGGateway("https://precoscombustiveis.dgeg.gov.pt")
const app = makeApp({
    vehicleRepository,
    gasTypeRepository,
    brandRepository,
    logAdapter,
    authService,
    standService,
    rabbitMQAdapter,
    testDriveRepository,
    fuelService
})

app.listen(process.env.PORT || 3003, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT || 3003}/`)
})



rabbitMQAdapter.listenToMessages(async (message) => {
    const usecase = new UpdateAvailabilityUseCase(vehicleRepository)
    const result = await usecase.execute(parseInt(message.content.toString()))
    console.log(result)
})

rabbitMQAdapter.listenToMessages(async (message) => {
    const usecase = new DeleteAllVehiclesByStandUseCase(vehicleRepository)
    const result = await usecase.execute(parseInt(message.content.toString()))
    console.log(result)
}, 'deleteVehicles')