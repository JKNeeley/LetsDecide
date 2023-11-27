const mongoose = require('mongoose')

const accessSchema = new mongoose.Schema({
  Accesses: [{
    Parent_Form_ID: String,
    Email: String,
    Passcode: String,
    Voted: Boolean
  }]
})

module.exports = mongoose.model('Accesses', accessSchema)
