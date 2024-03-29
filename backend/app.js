const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

app.use(express.static(path.join(__dirname, '../frontend/src')));

mongoose.connect('mongodb+srv://admin:oum6ZdhsYIFYEyuR@cluster0.5cmaqsn.mongodb.net/letsdecide?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection error');
  });


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
const resultsModel = require('./models/results');
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
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){res.status(14);return;}// Checking if valid object_id
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

// Get Questions by ID
app.get('/api/questions/:id', (req, res)=>{
  //console.log(req.params.id)
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){res.status(14);return;}// Checking if valid object_id
  questionModel.findById(req.params.id).then(documents=>{
    if (documents == null){
      res.status(204).send('No document with this ID located')
    }
    else {
      //console.log(documents);
      res.status(200).json({
        questions: documents
      })
    }
  })
  .catch((error) => {
    console.log('Error fetching data: ', error);
  })
})

//Get Questions by form ID
app.get('/api/form/questions/:id', (req, res)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){res.status(14);return;}// Checking if valid object_id
  formModel.findById(req.params.id).then(form =>{
    questionModel.findById(form.Questions_ID).then(questions=>{
      if (questions == null){
        res.status(204).send('No document with this ID located')
      }
      else {
        res.status(200).json({
          questions: questions
        })
      }
    })
  })
  .catch((error) => {
    console.log('Error fetching data: ', error);
  })
})


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
  //console.log('/api/forms/result/:id')
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){res.status(14);return;}// Checking if valid object_id
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
  // Create new form
  try {
    const newForm = new formModel({
      Title: req.body.title,
      Description: req.body.description,
      Type: 0,
      State: 1,
      Time_Close: req.body.endTime,
      Questions_ID: '0', // These will be updated later
      Responses_ID: '0'  // These will be updated later
    });
    const savedForm = await newForm.save();
    
    // Send form_id created automatically through MongoDB when creating new object
    // form_id will be used from Quetsion and Response object creation
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

  // Update form by id, linking form with corresponding new Question and Response objects
  try {
    const updatedForm = await formModel.findByIdAndUpdate(
      formId,
      { $set: { Responses_ID: responseId, Questions_ID: questionId } },
      { new: true }
    );

    if (!updatedForm) {
      return res.status(404).json({ error: 'Form not found' });
    }

    // Sends the entire updated form back
    res.status(200).json({ message: 'Form updated successfully', updatedForm });
  } catch (error) {
    console.error('Error updating form:', error);
    res.status(500).json({ error: 'Failed to update form' });
  }
});

//Create Questions
app.post('/api/questions', async (req, res) => {
  try {
      // Make new Question object with the parent_form_id
      const newQuestion = new questionModel();
      newQuestion.Questions = req.body.Questions;
      const savedQuestion = await newQuestion.save();
      const savedQuestionId = savedQuestion._id;
      
      // Send object_id of new Question object
      res.status(200).json({ savedQuestionId });
  } catch (error) {
      console.error('Error saving questions:', error);
      res.status(500).send('Error saving questions');
  }
});

app.post('/api/responses', async (req, res) => {
  // Calls this post request when first creating a form
  // Creates new Response object to store responses and links to parent form
  try {
    // Make new Response object with the parent_form_id given
    const newResponse = new responseModel();
    const savedResponse = await newResponse.save();
    const savedResponseId = savedResponse._id

    // Send object_id of new Response object
    res.status(200).json({ savedResponseId });
  } catch (error) {
    console.error('Error saving responses:', error);
    res.status(500).send('Error saving responses');
  }
});

app.post('/api/addResponse', async (req, res) => {
  //console.log('add resp');
  const { response_id, Responses } = req.body;
  
  try {
    const foundObject = await responseModel.findById(response_id);// Find response object by ID

    if (!foundObject) {
      console.log('not found');
      return res.status(404).json({ error: 'Object not found' });
    }

    // Once object is found push response to the response array in the object
    foundObject.Responses.push(Responses);
    const updatedObject = await foundObject.save();

    res.status(200).json({ updatedObject });
  } catch (error) {
    console.error('Error while saving:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.put('/api/forms/end-vote', async (req, res) => {
  const formId = req.body.formId;

  // Find form by parent form id, then switch State to 2 to indicate vote it over
  try {
    const updatedForm = await formModel.findByIdAndUpdate(formId, { State: 2 }, { new: true });

    if (!updatedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }
  } catch (error) {
    console.error('Error updating form:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Not in use currently
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

  // Store values above with corressponding accessModel
  let access = new accessModel(
    {
      Access: values
    });

  // Store values in database
  access.save()
  .then(() => {
    res.send('Data saved')
  })
  .catch((error) => {
    console.log('Error saving data: ', error);
  })


});


module.exports = app;
