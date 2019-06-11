const { mongoose } = require('../db')

const planSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  path: {
    type: [{
        type: String,
        required: true
    }],
    validate: [arr => arr.length >= 2, 'Path should have at list 2 members.']
  },
  timestamp: {
    type: Date,
    index: true
  },
  isDriver: {
    type: Boolean,
    default: false
  },
  carIndex: {
    type: Number,
    required: () => this.isDriver === true
  },
  price: {
    type: Number,
    default: 0
  },
  repeatPattern: {
    type: String,
    enum: [
      'never',
      'daily',
      'weekly',
      'monthly'
    ],
    default: 'never'
  }
})

const Plan = mongoose.model('Plan', planSchema)

module.exports = Plan