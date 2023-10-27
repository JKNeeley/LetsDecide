const mongoose = require('mongoose')

const formSchema = new mongoose.Schema({
  Title:        String,
  Description:  String,
  Type:         Number,
  State:        Number,
  Time_Close:    String,
  Draft_Name:    {type: String}, // not required; only if draft
  Draft_Code:    {type: String}, // not required; only if draft
  Questions_ID:  String,
  Responses_ID:  String,         // can be empty
  Access_ID:     {type: String}  // not required; only if private
});

module.exports = mongoose.model('form',formSchema)
