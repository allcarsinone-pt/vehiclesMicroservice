const router = require('express').Router()

router.post("/", async (req, res) => {
    const controller = req.app.get('ScheduleTestDriveController')
    controller.execute(req, res)
})

module.exports = router