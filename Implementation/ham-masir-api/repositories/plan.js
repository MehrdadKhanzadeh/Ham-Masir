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

const findSimilarPlans = async (plans) => {
  try {
    let allFoundPlans = []

    for (let i = 0; i < plans.length; i++) {
      const foundPlans = await Plan.find({
        username: {
          $ne: plans[i].username
        },
        date: plans[i].date,
        time: plans[i].time,
        path: {
          $all: [plans[i].path[0], plans[i].path[plans[i].path.length - 1]]
        }
      })

      allFoundPlans.push(foundPlans)
    }

    return {
      isSuccessful: true,
      data: allFoundPlans
    }
  } catch (err) {
    logger.error(err)

    return {
      isSuccessful: false,
      statusCode: '220'
    }
  }
  
}

module.exports = {
  createPlan,
  findPlansByUsername,
  findSimilarPlans
}