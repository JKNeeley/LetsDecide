const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  Questions: [{
    Parent_Form_ID: String,
    Type: Number,
    Description: String,
    Show_Top: Number,
    Options: [{type: String}]
  }]
})

module.exports = mongoose.model('Questions', questionSchema)
