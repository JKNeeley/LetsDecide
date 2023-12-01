const express = require('express')
const app = express()
const path = require('path');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors');

app.use(express.static(path.join(__dirname, '../frontend/src')));

mongoose.connect('mongodb+srv://admin:oum6ZdhsYIFYEyuR@cluster0.5cmaqsn.mongodb.net/letsdecide?retryWrites=true&w=majority')
//mongoose.connect('mongodb+srv://admin:oum6ZdhsYIFYEyuR@cluster0.5cmaqsn.mongodb.net/letsdecidetest?retryWrites=true&w=majority')
  .then(()=>{
    console.log('Connected to database')
  })
  .catch(()=>{
    console.log('connection error')
})


app.use(cors());

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
            //console.log(resp.Responses[i].Answers)
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
    //console.log('i')
    count.push([])
    for (let j = 0; j < ans.length; j++){
        //console.log('j')
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
            //console.log('no')
        }
    }
  }
  console.log(count)
  return count
}

//Create Vote Form
app.post('/api/forms', async (req, res) => {
  try {
    const newForm = new formModel({
      Title: req.body.title,
      Description: req.body.description,
      Type: 0,
      State: 0,
      Time_Close: req.body.endTime, // date
      Questions_ID: '0', 
      Responses_ID: '0'
    });

    const savedForm = await newForm.save();
    //console.log('Form saved successfully:', savedForm);
    const savedFormId = savedForm._id;
    res.json({ savedFormId });
  } catch (err) {
    console.error('Error saving form:', err);
    res.status(500).json({ error: 'An error occurred while saving the form.' });
  }
});




//Create Questions
app.post('/api/questions', async (req, res) => {
  try {
      const newQuestion = new questionModel();
      newQuestion.Questions = req.body.Questions;
      const savedQuestion = await newQuestion.save();
      const savedQuestionId = savedQuestion._id;
      res.status(200).json({ savedQuestionId });
  } catch (error) {
      console.error('Error saving questions:', error);
      res.status(500).send('Error saving questions');
  }
});





app.post('/api/responses', async (req, res) => {
  console.log("Got to responses");
  try {
    const newResponse = new responseModel({ Responses: req.body });
    const savedResponse = await newResponse.save();
    const savedResponseId = savedResponse._id
    res.status(200).json({ savedResponseId });
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
