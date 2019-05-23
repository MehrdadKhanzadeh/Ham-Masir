const plan = {
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  path: {
    type: [{
      latitude: {
        type: Number,
        min: 0,
        max: 90,
        required: true
      },
      longitude: {
        type: Number,
        min: 0,
        max: 90,
        required: true
      },
      postalAddress: {
        type: String,
        required: true
      }
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
  price: {
    type: Number,
    default: 0
  }
}