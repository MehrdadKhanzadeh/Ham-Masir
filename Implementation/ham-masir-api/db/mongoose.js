const mongoose = require('mongoose')
const { logger } = require('../utils')

const { mongooseSetting } = require('../config')

logger.info('Connecting To MongoDB Server...')

mongoose.connect(mongooseSetting.connectionString, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(
  () => {
    logger.info('Successfully Connected To MongoDB Server')
  },
  (err) => {
    logger.error('Can\'t Connect To MongoDB Server: ' + err)
  }
)

module.exports = mongoose