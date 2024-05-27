const ScheduleTestDriveUseCase = require("../usecases/ScheduleTestDriveUseCase/ScheduleTestDriveUseCase")

class ScheduleTestDriveController {

    constructor(testDriveRepository) {

        this.testDriveRepository = testDriveRepository
    }

    async execute(request, response) {

        let { vehicleid, date, username } = request.body
        if(!vehicleid || !date) {
            return response.status(400).json({ error: 'All fields are required. It should have vehicleId and date' })
        }

        const usecase = new ScheduleTestDriveUseCase({ testDriveRepository: this.testDriveRepository})
        const testDrive = await usecase.execute({vehicleid, date, username})

        if(testDrive.error) {
            return response.status(400).json({ error: testDrive.error.message })
        }

        return response.status(201).json(testDrive.data)
    }
}


module.exports = ScheduleTestDriveController