const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

app.use(express.static(path.join(__dirname, '../frontend/src')));


mongoose.connect('mongodb+srv://admin:oum6ZdhsYIFYEyuR@cluster0.5cmaqsn.mongodb.net/letsdecide?retryWrites=true&w=majority')
  .then(()=>{
    console.log('Connected to database')
  })
  .catch(()=>{
    console.log('connection error')
})


const formModel = require('./models/form')
const questionModel = require('./models/question')
const responseModel = require('./models/response')
const accessModel = require('./models/access')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PATCH, DELETE, OPTIONS"
  );
  console.log('Middleware');
  next();
})


// Define routes here
app.get('/', (req, res) => res.send('Hello World!'))
//app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//Create Vote Form
app.post('/api/forms', (req, res) => {

const finishedForm = new formModel({
    Title: req.body.title,
    Description: req.body.description,
    Type: req.body.type,
    State: req.body.state,
    Time_Close: req.body.time_close,
    Draft_Name: req.body.draft_name,
    Draft_Code: req.body.draft_code,
    Questions: req.body.questions,
    Responses: req.body.responses,
    Access: req.body.access
});


  finishedForm.save()
    .then(savedForm => {
      res.status(201).json(savedForm); // Respond with the saved form data
    })
    .catch(err => {
      res.status(500).send(err); // Handle error if form saving fails
    });
  
});


//Create Ballot
app.post('/api/questions', (req, res) => {
  var question_count = req.body.question_count;
  var i = 0;
  /*
  Passing the questions through post request
  Each element from the post request will be an array, this way we can pass in as many questions as we want
  *Options will be a 2d array
  */

  while(i<question_count)
  {
    let question = new questionModel(
      {
        ID: req.body.id[i],
        Parent_Form_ID: req.body.parent_form_id[i],
        Type: req.body.type[i],
        Description: req.body.description[i],
        Show_Top: null,
        Options: req.body.options[i]//array
      });
    questionModel.save()
    .then(() => {
      console.log('Data saved')
    })
    .catch((error) => {
      console.log('Error saving data: ', error);
    })
    i++;
  }
});


//where the voters send their response
app.post('/api/responses', (req, res) => {
  let response = new responseModel(
    {
      ID: req.body.id,
      Parent_Form_ID: req.body.parent_form_id,
      Answers: req.body.answers //array
    });
    responseModel.save()
    .then(() => {
      console.log('Data saved')
    })
    .catch((error) => {
      console.log('Error saving data: ', error);
    })
});

app.post('/api/access', (req, res) => {
  let access = new accessModel(
    {
      ID: req.body.id,
      Parent_Form_ID: req.body.parent_form_id,
      Email: req.body.email,
      Passcode: req.body.passcode,
      Voted: req.body.voted
    });
    accessModel.save()
    .then(() => {
      console.log('Data saved')
    })
    .catch((error) => {
      console.log('Error saving data: ', error);
    })
});


module.exports = app;
