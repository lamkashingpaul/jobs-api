const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Please provide company name'],
    maxLength: 50
  },

  position: {
    type: String,
    required: [true, 'Please provide position'],
    maxLength: 100
  },

  status: {
    type: String,
    enum: {
      values: ['interview', 'declined', 'pending'],
      message: ''
    },
    default: 'pending'
  },

  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user']
  }
}, { strict: 'throw', timestamps: true })

module.exports = mongoose.model('Job', JobSchema)
