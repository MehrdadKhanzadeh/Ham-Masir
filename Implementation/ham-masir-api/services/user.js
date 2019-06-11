const hash = require('hash.js')

const { logger } = require('../utils')
 
const { userRepository, planRepository } = require('../repositories')
 
const signup = async (username, password, firstName, lastName, phoneNumber, email, country, city) => {
  const hashedPassword = await hash.sha512().update(password).digest('hex')

  let user = {
    username: username,
    password: hashedPassword,
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    email: email,
    address: {
      country: country,
      city: city
    }
  }

  try {
    return await userRepository.createUser(user)
  } catch (err) {
    logger.error(err)

    return {
      isSuccessful: false,
      statusCode: '100'
    }
  }
}

const login = async (username, password) => {
  const hashedPassword = await hash.sha512().update(password).digest('hex')

  let user = {
    username: username
  }

  try {
    const res = await userRepository.findUser(user)

    if (res.isSuccessful) {
      if (res.data.password === hashedPassword) {
        let plan = {
          username: res.data._id
        }
        const res2 = await planRepository.findPlansByUsername(plan)
        const res3 = await planRepository.findSimilarPlans(res2.data)

        return {
          isSuccessful: true,
          data: {
            id: res.data._id,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            plans: res2.isSuccessful ? res2.data : [],
            requests: res.data.requests,
            suggestions: res3.data
          }
        }
      } else {
        return {
          isSuccessful: false,
          statusCode: '112'
        }
      }
    } else {
      return {
        isSuccessful: false,
        statusCode: '111'
      }
    }
  } catch (err) {
    logger.error(err)

    return {
      isSuccessful: false,
      statusCode: '110'
    }
  }
}

module.exports = {
  signup,
  login
}