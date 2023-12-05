const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.static(path.join(__dirname, '../frontend/src')));

mongoose.connect('mongodb+srv://admin:oum6ZdhsYIFYEyuR@cluster0.5cmaqsn.mongodb.net/letsdecide?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection error');
  });

app.use(cors());


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

const formModel = require('./models/form')
const questionModel = require('./models/question')
const responseModel = require('./models/response')
const accessModel = require('./models/access');
const form = require('./models/form');

/// Define routes here ///


// GET Requests //


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

// Returns the details of a form of a specific ID
app.get('/api/vote/details/:id', (req, res) => {
  formModel.findById(req.params.id)
    .then((document) => {
      if (document === null) {
        res.status(204).send('No document with this ID located');
      } else {
        // Modify this part based on your database structure
        const voteDetails = {
          title: document.Title,
          description: document.Description,
          question: document.Questions, // Modify accordingly based on your database structure
        };
        res.status(200).json(voteDetails);
      }
    })
    .catch((error) => {
      console.log('Error fetching data: ', error);
      res.status(500).send('Error fetching data');
    });
});

/*results psuedocode
get form info
get question info
get response info
get counts for each question
get winners for each question
assign Results.title, .description
assign Results.Question[forEach]
  description
  winners
  count
*/

// Returns the results of a form of a specific ID
// WIP, only supports First-Past-The-Post
app.get('/api/forms/result/:id', (req, res)=>{
  console.log('/api/forms/result/:id')
  formModel.findById(req.params.id).then(form=>{ //find form
    if (form == null){ res.status(204).send('No form document with this ID located').end() }
    //check if form is closed
    // if (document.State != 2){ res.send('Vote has not yet concluded').end() }
    responseModel.findById(form.Responses_ID).then(resp=>{ //find responses
      if (resp == null){ res.status(204).send('No response document with this ID located').end() }
      //check for 0 responses
      //todo
      questionModel.findById(form.Questions_ID).then(quest=>{ //find questions
        if (quest == null){ res.status(204).send('No question document with this ID located').end() }

        // count answers
        let answers = []
        for (let i = 0; i < resp.Responses.length; i++){
          answers.push(resp.Responses[i].Answers)
        }
        //console.log('answers')
        //console.log(answers)

        let count_res = countVotes(answers, quest.Questions)
        //console.log('count_res')
        //console.log(count_res)

        // get winners from count
        let winners_res = getWinners(quest.Questions, count_res)
        //console.log('winners_res')
        //console.log(winners_res)

        // format questions
        let questions_res = []
        for (let i = 0; i < quest.Questions.length; i++){
          console
          let cur_q = quest.Questions[i]
          questions_res.push({
            description: cur_q.Description,
            winners: winners_res[i],
            count: count_res[i]
          })
        }
        //console.log('questions_res')
        //console.log(questions_res)

        // create results instance
        const results = new resultsModel(
          {
            title: form.Title,
            description: form.Description,
            questions: questions_res
          }
        )

        //console.log('sending results')
        //console.log(results);

        // send results
        res.status(200).send(results);
      })
    })
  })
  .catch((error) => { console.log('Error fetching data: ', error); })
})

// Helper functions for Results

//Currently assumes First-Past-The-Post
function countVotes(ans, quest){
  // traverse questions, create 2nd array
  let count = []
  for (let i = 0; i < quest.length; i++){
    let options = []
    for (let j = 0; j < quest[i].Options.length; j++){
      //console.log('testing')
      //console.log(quest[i].Options[j])
      options.push({option:quest[i].Options[j], votes:0})
    }
    //console.log('options')
    count.push(options)
  }

  for (let i = 0; i < ans[0].length; i++){
    for (let j = 0; j < ans.length; j++){
        if (ans[j][i].length > 1){ break } // FPTP check
        let vote = ans[j][i][0]
        let voteFound = false
        //console.log('test')
        //console.log(count[i])
        for (let k = 0; k < count[i].length; k++){
            if (count[i][k].option == vote){
                voteFound = true
                count[i][k].votes += 1
                break
            }
        }
        if (!voteFound){ count[i].push({option:vote,votes:1}) } // just in case
    }
  }

  for (let i = 0; i < count.length; i++){
    count[i].sort(function(a,b){return b.votes - a.votes})
  }

  //console.log('returning')
  //console.log(count)
  return count
}

function getWinners(quest, count){
  //console.log('winners start')
  let winners = []
  for (let i = 0; i < quest.length; i++){
    //console.log(quest[i].Show_Top)
    //console.log(count[i].slice(0,quest[i].Show_Top))
    win_str = []
    let win_objs = count[i].slice(0,quest[i].Show_Top)
    for (let j = 0; j < win_objs.length; j++){
      win_str.push(win_objs[j].option)
    }
    //console.log('winstr')
    //console.log(win_str)

    winners.push(win_str)
  }

  //console.log('winners end fun')
  //console.log(winners)
  return winners
}





// POST Requests //

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

app.put('/api/forms/:formId/update', async (req, res) => {
  const formId = req.params.formId;
  const { responseId, questionId } = req.body;

  try {
    const updatedForm = await formModel.findByIdAndUpdate(
      formId,
      { $set: { Responses_ID: responseId, Questions_ID: questionId } },
      { new: true }
    );

    if (!updatedForm) {
      return res.status(404).json({ error: 'Form not found' });
    }

    res.status(200).json({ message: 'Form updated successfully', updatedForm });
  } catch (error) {
    console.error('Error updating form:', error);
    res.status(500).json({ error: 'Failed to update form' });
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
    console.log(savedResponseId)
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
