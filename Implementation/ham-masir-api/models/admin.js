const { mongoose } = require('../db')

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    index: true
  },
  password: {
    type: String,
    required: true
  }
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin