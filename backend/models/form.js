const mongoose = require('mongoose')

const formSchema = new mongoose.Schema({
  Title: String,
  Description: String,
  Type: Number,
  State: Number,
  Time_Close: Date,
  Questions_ID: String,
  Responses_ID: String
});

module.exports = mongoose.model('form',formSchema)
