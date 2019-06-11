const { logger } = require('../utils')

const { planService } = require('../services')

const addPlan = async (req, res, next) => {
  try {
    const data = req.body

    const username = data.username.toLowerCase().trim()
    const path = data.path
    const date = data.date.trim()
    const time = data.time.trim()
    const isDriver = data.isDriver
    const repeatPattern = data.repeatPattern.trim()

    res.json(await planService.addPlan(username, path, date, time, isDriver, repeatPattern))
  } catch (err) {
    logger.error(err)

    res.json({
      isSuccessful: false,
      statusCode: '000'
    })
  }
}

module.exports = {
  addPlan
}