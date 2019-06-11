const { logger } = require('../utils')

const { Plan } = require('../models')

const findPlansByUsername = async (plan) => {
  try {
    let foundPlans = await Plan.find(plan)

    if (foundPlans !== null) {
      return {
        isSuccessful: true,
        data: foundPlans
      }
    } else {
      return {
        isSuccessful: false,
        statusCode: '211'
      }
    }
  } catch (err) {
    logger.error(err)

    return {
      isSuccessful: false,
      statusCode: '210'
    }
  }
}

module.exports = {
  findPlansByUsername
}