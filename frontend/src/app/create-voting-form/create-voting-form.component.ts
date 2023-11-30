import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


export interface Question {
  title: string;
  description: string;
  endTime: Date;
  questionText: string;
  answerInput: string;
  answers: string[];
}

interface QuestionStore{
Questions: {
  Parent_Form_ID: string,
  Type: number,
  Description: string,
  Show_Top: number,
  Options: string[]
}

}

interface Response {
  Parent_Form_ID: string,
  Responses: []
}



@Component({
  selector: 'app-create-voting-form',
  templateUrl: './create-voting-form.component.html',
  styleUrls: ['./create-voting-form.component.css']
})




export class CreateVotingFormComponent {
  
  title: string = '';
  description: string = '';
  endTime: string = '';
  questions: any[] = []; // Define an empty array for questions
  // rType: 

addQuestion() {
  this.questions.push({
    title: '',
    description: '',
    endTime: '',
    questionText: '',
    answerInput: '',
    answers: []
  });
}

removeQuestion(index: number) {
  this.questions.splice(index, 1);
}

parseAnswers(question: Question) {
  question.answers = question.answerInput.split(',').map(answer => answer.trim());
}

  showSaveCredentialsPopup = false;

  constructor(private router: Router, private http: HttpClient) {}
  
  saveQuestions(questions: any, ID: string)
  {
    this.http.post<any>('http://localhost:3000/api/questions', questions)
      .subscribe(
        (response) => {
          return response.savedQuestion._id;
        },
        (error) => {
          console.error('Error sending questions:', error);
          return -1;
        }
      );
  }
  createResponses(ID: string)
  {
    const rsp: Response = {
      Parent_Form_ID: ID,
      Responses: []
    };
    let responseId;

    this.http.post<any>('http://localhost:3000/api/responses', rsp)
      .subscribe(
        (response) => {
          responseId = response?.savedResponse?._id;
        },
        (error) => {
          console.error('Error sending response:', error);
          responseId = -1;
        }
      );
      return responseId;
  }

  onFormCreation(form: any)
  {
    //console.log(form)
    let Response_ID;
    let Question_ID;




    this.http.post<any>('http://localhost:3000/api/forms', form)
      .subscribe(
        (response) => {
          let id = response.savedFormId
          console.log('Form sent successfully:', id);
          Response_ID = this.createResponses(id);
          
          

          //Question_ID = this.saveQuestions(questionsData, id);


        },
        (error) => {
          console.error('Error sending form:', error);
          
        }
      );
    
  }
    //this.navigateToHomePage();
    navigateToHomePage() {
      this.router.navigate(['/']);
    }

  }

  
 


