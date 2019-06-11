const { logger } = require('../utils')
 
const { planRepository } = require('../repositories')

const addPlan = async (username, path, date, time, isDriver, repeatPattern) => {
  const timestamp = new Date(date + ' ' + time)

  let plan = {
    username: username,
    path: path,
    timestamp: timestamp,
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