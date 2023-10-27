const express = require('express')
const app = express()
const port = 3001
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


// Define models here


mongoose.connect('mongodb+srv://mel:testing12@cluster0.5cmaqsn.mongodb.net/')
  .then(()=>{
    console.log('Connected to database')
  })
  .catch(()=>{
    console.log('connection error')
})

const voteModel = mongoose.model('Form', {});
const questionModel = mongoose.model('Question', {});
const responseModel = mongoose.model('Response', {});
const accessModel = mongoose.model('Access', {});

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
app.listen(port, () => console.log(`Example app listening on port ${port}!`))



//Home
app.post('/', (req, res) => {
  if(req.body.email)
  {
    console.log(req.body.email);//display current account logged in
  }
  else
  {
    console.log("Login");
  }
});

//Create Vote Form
app.post('/createForm', (req, res) => {
  const finishedForm = new voteModel(
    {
      ID: req.body.id,
      Title: req.body.title,
      Description: req.body.description,
      Type: req.body.type,
      State: req.body.state,
      Time_Close: req.body.time_close,//date
      Draft_Name: req.body.draft_name,
      Draft_Code: req.body.draft_code,
      Questions: req.body.questions,//array
      Responses: req.body.responses,//array
      Access: req.body.responses//array
    });
    finishedForm.save()
    .then(() => {
      console.log('Data saved')
    })
    .catch((error) => {
      console.log('Error saving data: ', error);
    })
    res.redirect('/');
});


//Create Ballot
app.post('/createBallot', (req, res) => {
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
app.post('/vote', (req, res) => {
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

app.post('/access', (req, res) => {
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
