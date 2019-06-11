const express = require('express')

const userRouter = require('./user')
const planRouter = require('./plan')

const router = express.Router()

router.use('/user', userRouter)
router.use('/plan', planRouter)

module.exports = router