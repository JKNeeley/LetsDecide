const mongoose = require('mongoose')

const resultsSchema = new mongoose.Schema({
  _id: false,
  title: String,
  description: String,
  questions: [{
    _id: false,
    description: String,
    winners: [[String]],
    count: [[{
      _id: false,
      option: String,
      votes: Number
    }]]
  }]
})

module.exports = mongoose.model('Results', resultsSchema)
