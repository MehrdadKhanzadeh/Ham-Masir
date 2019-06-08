const { logger } = require('../utils')

const { userService } = require('../services')

const signup = async (req, res, next) => {
  try {
    const data = req.body

    const username = data.username.toLowerCase().trim()
    const password = data.password
    const repeatPassword = data.repeatPassword
    const firstName = data.firstName.trim()
    const lastName = data.lastName.trim()
    const phoneNumber = data.phoneNumber.trim()
    const email = data.email.trim()
    const country = data.country.trim()
    const city = data.city.trim()

    const usernameValidator = new RegExp('^[a-zA-Z0-9_]{3,}')
    const passwordValidator = new RegExp('^.{6,}')
    const phoneNumberValidator = new RegExp('^\d{10}')
    const emailValidator = new RegExp('^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))')

    if (!usernameValidator.test(username)) {
      res.json({
        isSuccessful: false,
        statusCode: 100
      })
    } else if (!passwordValidator.test(password)) {
      res.json({
        isSuccessful: false,
        statusCode: 100
      })
    } else if (password !== repeatPassword) {
      res.json({
        isSuccessful: false,
        statusCode: 100
      })
    } else if (!phoneNumberValidator.test(phoneNumber)) {
      res.json({
        isSuccessful: false,
        statusCode: 100
      })
    } else if (!emailValidator.test(email)) {
      res.json({
        isSuccessful: false,
        statusCode: 100
      })
    } else {
      res.json(await userService.signup(username, password, firstName, lastName, phoneNumber, email, country, city))
    }
  } catch (err) {
    logger.error(err)

    res.json({
      isSuccessful: false,
      statusCode: 100
    })
  }
}

const login = async (req, res, next) => {
  try {
    const data = req.body

    const username = data.username.toLowerCase().trim()
    const password = data.password

    res.json(await userService.login(username, password))

  } catch (err) {
    logger.error(err)

    res.json({
      isSuccessful: false,
      statusCode: 100
    })
  }
} 

module.exports = {
  signup,
  login
}