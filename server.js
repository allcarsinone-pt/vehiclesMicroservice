const makeApp = require('./src/appBuilder')
const dotenv = require('dotenv')
const PostgreVehicleRepository = require('./src/repositories/PostgreVehicleRepository')
const PostgreGasTypeRepository = require('./src/repositories/PostgreGasTypeRepository')
const PostgreBrandRepository = require('./src/repositories/PostgreBrandRepository')

dotenv.config()

const app = makeApp(new PostgreVehicleRepository(process.env.DATABASE_URL), 
                    new PostgreGasTypeRepository(process.env.DATABASE_URL), 
                    new PostgreBrandRepository(process.env.DATABASE_URL))

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT || 3000}/`)
})