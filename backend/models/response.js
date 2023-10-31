const mongoose = require('mongoose')

const responseSchema = new mongoose.Schema({
  Responses: [{
    Parent_Form_ID: String,
    Answers: [[{type: String}]]
  }]
})

module.exports = mongoose.model('Responses', responseSchema)
