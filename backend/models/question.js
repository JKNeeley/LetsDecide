const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  Questions: [{
    _id: false,
    Parent_Form_ID: String,
    Type: Number,
    Description: String,
    Show_Top: Number,
    Options: [{_id: false, type: String}]
  }]
})

module.exports = mongoose.model('Questions', questionSchema)
