const { mongoose } = require('../db')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  address: {
    country: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    }
  },
  phoneNumber: {
    type: String,
    index: true
  },
  email: {
    type: String,
    index: true
  },
  cars: [{
    type: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    capacity: {
      type: Number,
      required: true
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    }
  }],
  photos: [{
    type: Buffer
  }],
  aboutMe: {
    type: String
  },
  rating: {
    personality: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    driving: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    }
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User