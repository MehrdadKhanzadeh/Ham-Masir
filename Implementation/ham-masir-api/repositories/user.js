const { logger } = require('../utils')

const { User } = require('../models')

const createUser = async (user) => {
  try {
    await User.create(user)

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

const findUser = async (user) => {
  try {
    let foundUser = await User.findOne(user).populate({
      path: 'requests',
      model: 'Plan',
      populate: {
        path: 'username',
        model: 'User'
      }
    })

    if (foundUser !== null) {
      return {
        isSuccessful: true,
        data: foundUser
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
  createUser,
  findUser
}