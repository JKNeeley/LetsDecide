const mongoose = require('mongoose')

const resultsSchema = new mongoose.Schema({
  title: String,
  description: String,
  question: [{
    description: String,
    winners: [String],
    count: [{
      option: String,
      votes: Number
    }]
  }]
})
