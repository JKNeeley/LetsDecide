import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormService } from './create-voting-form.service'
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';



export interface Question {
  title: string;
  description: string;
  endTime: Date;
  questionText: string;
  answerInput: string;
  answers: string[];
}

interface QuestionStore {
  Questions: {
    Parent_Form_ID: string;
    Description: string;
    Type: number;
    Show_Top: number;
    Options: string[];
  }[];
}

interface Response {
  Parent_Form_ID: string;
  Responses: [];
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

  constructor(private router: Router, private formService: FormService) {}
  
  //Form
  onFormCreation(form: any) {
  console.log(form);
  let parent_id, response_id, question_id;
  this.formService.saveForm(form).subscribe(
    (response) => {
      parent_id = response.savedFormId;
      console.log('Form sent successfully:', parent_id);
      this.saveResponses(parent_id);
      this.saveQuestions(parent_id, form);


    }
  );
  
}


  //Response
  saveResponses(ID: string){
    let response_id = -1;
    return this.formService.saveResponses(ID).subscribe(
    (response) => {
      response_id = response.savedResponse;
      console.log('Response sent successfully:', response_id);
    }
  );
  }


   saveQuestions(ID: string, form: any){
    let question_id = -1;
    const questions: QuestionStore = {
      Questions: []
    };

    let questionNumber = 0;
    while (form[`title${questionNumber}`]) {
      const title = form[`title${questionNumber}`];
      const options = form[`answerInput${questionNumber}`]?.split(',')?.map((option: string) => option.trim()) || [];

      const question = {
        Parent_Form_ID: ID,
        Description: title,
        Type: 0,
        Show_Top: 0,
        Options: options
      };

      questions.Questions.push(question);
      questionNumber++;
    }
    this.formService.saveQuestions(questions).subscribe(
      (response) => {
        question_id = response?.savedResponse?._id;
        //console.log("Q: ", response);
        console.log(question_id);
      },
      (error) => {
        console.error('Error sending response:', error);
      }
    );
    return question_id;
   } 

  //this.navigateToHomePage();
  navigateToHomePage() {
    this.router.navigate(['/']);
  }

  }

  
 


