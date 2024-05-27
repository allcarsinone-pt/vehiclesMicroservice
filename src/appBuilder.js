const express = require('express');
const cors = require('cors');
const vehicleRouter = require('./routes/VehicleRouter')
const brandRouter = require('./routes/BrandRouter')
const gasTypeRouter = require('./routes/GasTypeRouter')
const GetBrandsController = require('./controllers/GetBrandsController')
const RegisterBrandController = require('./controllers/RegisterBrandController')
const EditBrandController = require('./controllers/EditBrandController')
const DeleteBrandController = require('./controllers/DeleteBrandController')
const RegisterGasTypeController = require('./controllers/RegisterGasTypeController')
const EditGasTypeController = require('./controllers/EditGasTypeController')
const DeleteGasTypeController = require('./controllers/DeleteGasTypeController')
const RegisterVehicleController = require('./controllers/RegisterVehicleController')
const EditVehicleController = require('./controllers/EditVehicleController')
const DeleteVehicleController = require('./controllers/DeleteVehicleController')
const LogMockAdapter = require('./adapters/LogMockAdapter')
const MockAuthServiceAdapter = require('./adapters/MockAuthServiceAdapter');
const StandMockAdapter = require('./adapters/StandMockAdapter');
const GetVehicleDetailsController = require('./controllers/GetVehicleDetailsController');
const FilterVehiclesController = require('./controllers/FilterVehiclesController');
const ScheduleTestDriveController = require('./controllers/ScheduleTestDriveController');
const TestDrivesRouter = require('./routes/TestDrivesRouter');
const RabbitMockAdapter = require('./adapters/RabbitMockAdapter');
const GetGasTypesController = require('./controllers/GetGasTypesController');
const multerMiddleware = require('../config/multer-config');
const path = require('path')
function makeApp(vehicleRepository, gasTypeRepository, brandRepository ,logAdapter = new LogMockAdapter(),
    authService = new MockAuthServiceAdapter(), standService = new StandMockAdapter, rabbitMQAdapter = new RabbitMockAdapter(), testDriveRepository) {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.set('ScheduleTestDriveController', new ScheduleTestDriveController(testDriveRepository));
    app.set('GetGasTypesController', new GetGasTypesController(gasTypeRepository, logAdapter));
    app.set('GetBrandsController', new GetBrandsController(brandRepository, logAdapter));
    app.set('RegisterBrandController', new RegisterBrandController(brandRepository, logAdapter));
    app.set('EditBrandController', new EditBrandController(brandRepository, logAdapter));
    app.set('DeleteBrandController', new DeleteBrandController(brandRepository, logAdapter));
    app.set('RegisterGasTypeController', new RegisterGasTypeController(gasTypeRepository, logAdapter));
    app.set('EditGasTypeController', new EditGasTypeController(gasTypeRepository, logAdapter));
    app.set('DeleteGasTypeController', new DeleteGasTypeController(gasTypeRepository, logAdapter));
    app.set('RegisterVehicleController', new RegisterVehicleController(vehicleRepository, logAdapter));
    app.set('EditVehicleController', new EditVehicleController(vehicleRepository, logAdapter));
    app.set('DeleteVehicleController', new DeleteVehicleController(vehicleRepository, logAdapter));
    app.set('GetVehicleDetailsController', new GetVehicleDetailsController(vehicleRepository, logAdapter));
    app.set('FilterVehiclesController', new FilterVehiclesController(vehicleRepository, logAdapter));
    app.set('RabbitMQAdapter', rabbitMQAdapter)
    app.set('multerMiddleware', multerMiddleware)
    app.set('LogAdapter', logAdapter) // Log adapter: ex: rabbitmq
    app.set('AuthAdapter', authService)
    app.set('StandService', standService)    
    app.use('/vehicles',vehicleRouter);
    app.use('/testdrives', TestDrivesRouter);
    app.use('/brands', brandRouter);
    app.use('/gastypes', gasTypeRouter);
    console.log(path.join(__dirname, './static/'))
    app.use('/', express.static(path.join(__dirname, './static/')));
    return app;
}

module.exports = makeApp