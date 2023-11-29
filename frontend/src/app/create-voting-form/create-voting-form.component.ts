import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


export interface Question {
  title: string;
  description: string;
  endTime: string; // Consider using Date type or a specific format
  questionText: string;
  answerInput: string; // A string to hold comma-separated answers
  answers: string[]; // Array to hold individual answers
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
  
  onFormCreation(form: any)
  {
    console.log(form)
    this.http.post<any>('http://localhost:3000/api/forms', form)
      .subscribe(
        (response) => {
          console.log('Form sent successfully:', response);
          // Handle response from the server as needed
        },
        (error) => {
          console.error('Error sending form:', error);
          // Handle error
        }
      );
    
  }
  
    //this.navigateToHomePage();
    navigateToHomePage() {
      this.router.navigate(['/']); // Navigate to the desired route after form submission
    }

  }

  
 


