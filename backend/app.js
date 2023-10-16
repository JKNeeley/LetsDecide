const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


// Define models here


mongoose.connect('mongodb+srv://SURF_Webmaster:2MQjduCM4U9q7eGx@mizzousurf.l9qioaf.mongodb.net/SURF?retryWrites=true&w=majority')
  .then(()=>{
    console.log('Connected to database')
  })
  .catch(()=>{
    console.log('connection error')
})

const voteModel = mongoose.model('Form', {});
const questionModel = mongoose.model('Question', {});





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






//pages: Home Page, Create Ballot, Start Election, Cast Vote, Election Results
//This is all on page 16 on Cap 2 Starting Doc


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
      Time_Close: req.body.time_close,
      Draft_Name: req.body.draft_name,
      Draft_Code: req.body.draft_code
    });
    finishedForm.save()
    .then(() => {
      console.log('Data saved')
    })
    .catch((error) => {
      console.log('Error saving data: ', error);
    })
});


//Create Ballot
app.post('/createBallot', (req, res) => {
  var question_count = req.body.question_count;
  var i = 0;
  while(i<question_count)
  {
    let question = new questionModel(
      {
        ID: (req.body.id + "" + i),
        Parent_Form_ID: (req.body.parent_form_id + "" + i),
        Type: (req.body.type + "" + i),
        Description: (req.body.description + "" + i),
        Show_Top: null,
        Options: [req.body.question1 + "_" + i, req.body.question2 + "_" + i, req.body.question3 + "_" + i, req.body.question4 + "_" + i]
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


module.exports = app;
