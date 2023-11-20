const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


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

app.set('view engine', 'ejs'); // Set EJS as the view engine
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.set('views', path.join(__dirname, '..', 'frontend', 'src', 'app')); // Set the views directory to the 'frontend/src/app' directory


app.use(express.static(path.join(__dirname, '../frontend')));
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

app.get('/src/app/temp-save', (req, res) => {
  //console.log("Loaded");
  res.render('temp-save'); // Assuming 'temp-save.ejs' is your EJS template file
});


// Define routes here
app.get('/', (req, res) => res.send('Hello World!'))


//Create Vote Form
app.post('/api/forms', (req, res) => {
  const finishedForm = new formModel(
    {
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

app.get('/api/forms',(req,res,next)=>{
  formModel.find().then(documents=>{
    res.status(200).json({
      message: "This is fetched data",
      forms: documents
    })
  })
})


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
