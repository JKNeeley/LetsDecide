const express = require('express')
const app = express()
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


app.set('view engine', 'ejs'); // Set EJS as the view engine
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.set('views', path.join(__dirname, '..', 'frontend', 'src', 'app')); // Set the views directory to the 'frontend/src/app' directory


app.use(express.static(path.join(__dirname, '../frontend')));


const formModel = require('./models/form')
const questionModel = require('./models/question')
const responseModel = require('./models/response')
const accessModel = require('./models/access');

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

app.get('/src/app/temp-save-questions', (req, res) => {
  res.render('temp-save-questions');
});
app.get('/src/app/temp-save-responses', (req, res) => {
  res.render('temp-save-responses');
});
app.get('/src/app/temp-save-access', (req, res) => {
  res.render('temp-save-access');
});


/// Define routes here ///


// GET


app.get('/', (req, res) => res.send('Hello World!'))

// Returns all forms
app.get('/api/forms',(req,res)=>{
  formModel.find().then(documents=>{
    res.status(200).json({
      message: "All forms",
      forms: documents
    })
  })
})

// Returns form of a specific object ID
app.get('/api/forms/:id', (req, res)=>{
  formModel.findById(req.params.id).then(documents=>{
    if (documents == null){
      res.status(204).send('No document with this ID located')
    }
    else {
      res.status(200).json({
        form: documents
      })
    }
  })
  .catch((error) => {
    console.log('Error fetching data: ', error);
  })
})

// Returns the results of a form of a specific ID
// WIP, only supports First-Past-The-Post
app.get('/api/forms/result/:id', (req, res)=>{
  formModel.findById(req.params.id).then(document=>{ //find form
    if (document == null){
      res.status(204).send('No document with this ID located')
    }
    /*
    else if (document.State != 2) //check if form has closed
    {
      res.send('Vote has not yet concluded')
    }
    */
    else{
      responseModel.findById(document.Responses_ID).then(resp=>{ //find responses
        if (resp == null){
          res.status(204).send('No document with this ID located')
        }
        else{
          let answers = []
          //resp.Responses.forEach(to_arr)
          for (let i = 0; i < resp.Responses.length; i++){
            console.log(resp.Responses[i].Answers)
            answers.push(resp.Responses[i].Answers)
          }
          console.log(answers)
          let count = countVotes(answers)
          res.status(200).send(count)
        }
      })
    }
  })
  .catch((error) => {
    console.log('Error fetching data: ', error);
  })

})

function to_arr(x){
  //console.log(x)
  delete x.Parent_Form_ID
  answers.push(x.Answers)
}

// Currently assumes First-Past-The-Post
function countVotes(ans)
{
  count = []
  for (let i = 0; i < ans[0].length; i++){
    console.log('i')
    count.push([])
    for (let j = 0; j < ans.length; j++){
        console.log('j')
        if (ans[j][i].length > 1){
            break
        }
        let vote = ans[j][i][0]
        let voteFound = false
        for (let k = 0; k < count[i].length; k++){
            if (count[i][k][0] == vote){
                voteFound = true
                count[i][k][1] += 1
                break
            }
        }
        if (!voteFound){
            count[i].push([vote,1])
            console.log('no')
        }
    }
  }

  return count
}



// POST

//Create Vote Form
app.post('/api/forms', (req, res) => {
  const finishedForm = new formModel(
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
      Accesses: req.body.accesses//array
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
    }
  });


//Create Questions
app.post('/api/questions', async (req, res) => {
  try {
    const questionsData = req.body.questions;
    const questionArray = [];
    
    //go through each questions data, save, then add it to the questionArray for later
    for (const question of questionsData) {
      const values = {
        Parent_Form_ID: question.Parent_Form_ID,
        Type: question.Type,
        Description: question.Description,
        Show_Top: question.Show_Top,
        Options: question.Options.split(',').map(option => option.trim())
      }
      questionArray.push(values);
    }

    //create new questionModel to save to db, assign array of values to the Questions:
    const newQuestion = questionModel({});
    newQuestion.Questions = questionArray;
    newQuestion.save();
    res.send("Questions Saved");
  } catch (error) {
    console.error('Error saving questions:', error);
    res.status(500).send('Error saving questions');
  }
});




//where the voters send their response
app.post('/api/responses', (req, res) => {
  try {
    const responseData = req.body.responses;
    const responseArray = [];
    
    for (const response of responseData) {
      const values = {
        Parent_Form_ID: response.Parent_Form_ID,
        Answers: response.Answers
      }
      responseArray.push(values);
      
    }
    
    res.send(responseArray);
    
    //create new responseModel to save to db, assign array of values to the Responses:
    const newResponse = responseModel({});
    newResponse.Responses = responseArray;
    newResponse.save();
    res.send("Questions Saved");
    
  } catch (error) {
    console.error('Error saving responses:', error);
    res.status(500).send('Error saving responses');
  }
});


app.post('/api/access', (req, res) => {
  const accessData = req.body.access[0];
  
  if(accessData.Voted == 'on'){accessData.Voted = true;}
  else{accessData.Voted = false;}
  const values = {
      Parent_Form_ID: accessData.Parent_Form_ID,
      Email: accessData.Email,
      Passcode: accessData.Passcode,
      Voted: accessData.Voted
  }
  
  let access = new accessModel(
    {
      Access: values
    });
      
  //res.send(access);
  
  access.save()
  .then(() => {
    res.send('Data saved')
  })
  .catch((error) => {
    console.log('Error saving data: ', error);
  })
  
    
});


module.exports = app;
