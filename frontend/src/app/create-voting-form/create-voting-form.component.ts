import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormService } from './create-voting-form.service'


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

  constructor(private router: Router, private formService: FormService) {}
  
  //Form
  onFormCreation(form: any) {
    this.formService.saveForm(form).subscribe(
      (response) => {
        const id = response.savedFormId;
        console.log('Form sent successfully:', id);
        this.createResponses(id);
        // this.saveQuestions(questionsData, id);
      },
      (error) => {
        console.error('Error sending form:', error);
      }
    );
  }

  //Response
  createResponses(ID: string) {
    this.formService.createResponses(ID).subscribe(
      (response) => {
        const responseId = response?.savedResponse?._id;
        // Do something with the response ID
      },
      (error) => {
        console.error('Error sending response:', error);
      }
    );
  }


  //this.navigateToHomePage();
  navigateToHomePage() {
    this.router.navigate(['/']);
  }

  }

  
 


