const express = require('express')

const { planController } = require('../controllers')

const planRouter = express.Router()

planRouter.route('/add')
  .post(planController.addPlan)

module.exports = planRouter