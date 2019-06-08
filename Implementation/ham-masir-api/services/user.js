const hash = require('hash.js')

const { logger } = require('../utils')
 
const { userRepository } = require('../repositories')
 
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
      statusCode: '0100'
    }
  }
}

const login = async (username, password) => {
  const hashedPassword = await hash.sha512().update(password).digest('hex')

  let user = {
    username: username,
    password: hashedPassword
  }

  try {
    return await userRepository.findUser(user)
  } catch (err) {
    logger.error(err)

    return {
      isSuccessful: false,
      statusCode: '0110'
    }
  }
}

module.exports = {
  signup,
  login
}