const { logger } = require('../utils')
 
const { planRepository } = require('../repositories')

const addPlan = async (username, path, date, time, isDriver, repeatPattern) => {
  let plan = {
    username: username,
    path: path,
    date: date,
    time: time,
    isDriver: isDriver,
    repeatPattern: repeatPattern
  }

  try {
    return await planRepository.createPlan(plan)
  } catch (err) {
    logger.error(err)

    return {
      isSuccessful: false,
      statusCode: '100'
    }
  }
}

module.exports = {
  addPlan
}