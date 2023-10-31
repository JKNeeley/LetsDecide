const mongoose = require('mongoose')

const accessSchema = new mongoose.Schema({
  Access: [{
    Parent_Form_ID: String,
    Email: String,
    Passcode: String,
    Voted: Boolean
  }]
})

module.exports = mongoose.model('Access', accessSchema)
