const winston = require('winston')
const chalk = require('chalk')

const logger = winston.createLogger({
  level: 'silly',
  format: winston.format.combine(
    winston.format.colorize({
      all: true
    }),
    winston.format.timestamp({
      format: 'YYYY/MM/DD-HH:mm:ss'
    }),
    winston.format.align(),
    winston.format.printf(info => {
      return chalk.cyan(`\n[ham-masir-api(${chalk.magenta.bold(info.timestamp)} => ${chalk.bold(info.level)})]\t${chalk.bold(info.message)}`)
    })
  ),
  transports: [
    new winston.transports.Console()
  ]
})

module.exports = logger