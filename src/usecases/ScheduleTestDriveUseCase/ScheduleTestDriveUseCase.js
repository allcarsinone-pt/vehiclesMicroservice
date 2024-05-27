const { Result, handleError } = require('../../util/Result')


class ScheduleTestDriveUseCase {

    constructor({ testDriveRepository }) {
        this.testDriveRepository = testDriveRepository
    }

    async execute(data) {
        
        const withErrorHandling = handleError(async () => {

            let scheduleTestDrive = await this.testDriveRepository.create(data)
            return Result.success(scheduleTestDrive)
        })
        return withErrorHandling()
    }
}

module.exports = ScheduleTestDriveUseCase