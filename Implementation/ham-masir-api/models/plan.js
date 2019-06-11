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
    validate: [arr => arr.length >= 2, 'مسیر باید حداقل حاوی ۲ عضو باشد.']
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
    required: () => this.isDriver === true,
    default: 0
  },
  price: {
    type: Number,
    default: 0
  },
  repeatPattern: {
    type: String,
    enum: [
      'هرگز',
      'روزانه',
      'هفتگی',
      'ماهانه'
    ],
    default: 'هرگز'
  }
})

const Plan = mongoose.model('Plan', planSchema)

module.exports = Plan