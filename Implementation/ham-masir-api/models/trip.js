const { mongoose } = require('../db')

const tripSchema = new mongoose.Schema({
  startTimestamp: {
    type: Date,
    default: Date.now
  },
  endTimestamp: {
    type: Date
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  passengers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  state: {
    type: String,
    enum: [
      'planned',
      'in progress',
      'done'
    ]
  }
})

const Trip = mongoose.model('Trip', tripSchema)

module.exports = Trip