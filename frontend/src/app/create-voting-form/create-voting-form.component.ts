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
  // Add a new question object to the array
  this.questions.push({
    title: '',
    description: '',
    endTime: '', // Initialize with default values
    questionText: '',
    answerInput: '', // Input for comma-separated answers
    answers: [] // Array to hold individual answers
  });
}

removeQuestion(index: number) {
  // Remove a question based on its index
  this.questions.splice(index, 1);
}

parseAnswers(question: Question) {
  // Split the comma-separated answers and store them in the answers array
  question.answers = question.answerInput.split(',').map(answer => answer.trim());
}

  showSaveCredentialsPopup = false;

  constructor(private router: Router, private http: HttpClient) {}
  
  saveQuestions(questions: any, ID: string){}
  createResponses(ID: string)
  {
    const rsp: Response = {
      Parent_Form_ID: ID,
      Responses: []
    };

    this.http.post<any>('http://localhost:3000/api/responses', rsp)
      .subscribe(
        (response) => {
          console.log('Response sent successfully:', response.savedResponseId);
        },
        (error) => {
          console.error('Error sending response:', error);
          
        }
      );
  }

  onFormCreation(form: any)
  {
    console.log(form)
    this.http.post<any>('http://localhost:3000/api/forms', form)
      .subscribe(
        (response) => {
          let id = response.savedFormId
          console.log('Form sent successfully:', id);
          this.createResponses(id);
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

  
 


