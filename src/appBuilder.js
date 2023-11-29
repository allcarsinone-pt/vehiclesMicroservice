const express = require('express');
const router = require('./routes/VehicleRouter')
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
const MockAuthServiceAdapter = require('./adapters/MockAuthServiceAdapter')

function makeApp(vehicleRepository, gasTypeRepository, brandRepository,
    logAdapter = new LogMockAdapter(), authService = new MockAuthServiceAdapter()) {
    const app = express();
    app.use(express.json());
    app.set('RegisterBrandController', new RegisterBrandController(brandRepository, logAdapter));
    app.set('EditBrandController', new EditBrandController(brandRepository, logAdapter));
    app.set('DeleteBrandController', new DeleteBrandController(brandRepository, logAdapter));
    app.set('RegisterGasTypeController', new RegisterGasTypeController(gasTypeRepository, logAdapter));
    app.set('EditGasTypeController', new EditGasTypeController(gasTypeRepository, logAdapter));
    app.set('DeleteGasTypeController', new DeleteGasTypeController(gasTypeRepository, logAdapter));
    app.set('RegisterVehicleController', new RegisterVehicleController(vehicleRepository, logAdapter));
    app.set('EditVehicleController', new EditVehicleController(vehicleRepository, logAdapter));
    app.set('DeleteVehicleController', new DeleteVehicleController(vehicleRepository, logAdapter));
    app.set('LogAdapter', logAdapter) // Log adapter: ex: rabbitmq
    app.set('AuthAdapter', authService)
    app.use('/vehicle', router);
    return app;
}

module.exports = makeApp