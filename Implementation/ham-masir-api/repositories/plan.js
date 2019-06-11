const { logger } = require('../utils')

const { Plan } = require('../models')

const createPlan = async (plan) => {
  try {
    await Plan.create(plan)

    return {
      isSuccessful: true
    }
  } catch (err) {
    logger.error(err)

    return {
      isSuccessful: false,
      statusCode: '200'
    }
  }
}

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
  createPlan,
  findPlansByUsername
}