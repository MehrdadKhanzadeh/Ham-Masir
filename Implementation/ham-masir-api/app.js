const express = require('express')

const routes = require('./routes')
const { logger } = require('./utils')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => res.send('API Is Alive!'))

app.use('/', routes)

const port = process.env.PORT || 5000

app.listen(port, () => logger.info(`API Is Listening on Port ${port}`))