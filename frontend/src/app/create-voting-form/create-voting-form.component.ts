import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormService } from './create-voting-form.service'
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Form } from '../cast-vote/form.model';
import mongoose from 'mongoose';



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
    Parent_Form_ID: String;
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

  form: String | undefined;
  form_id?: String;
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
  showVoteFormIdPopup = false;

  constructor(private router: Router, private formService: FormService) {}

  //Form
  onFormCreation(form: any) {
    console.log(form);
    let parent_id: String, response_id: string | undefined, question_id: string | undefined;

    this.formService.saveForm(form).subscribe(
      async (response) => {
        parent_id = response.savedFormId;
        console.log('Form sent successfully:', parent_id);
        this.form_id = parent_id;
        try {
          const savedResponse: any = await this.saveResponses(parent_id);
          response_id = savedResponse?.savedResponseId?.toString();
        } catch (error) {
          console.error('Error while saving responses:', error);
        }

        try {
          const savedQuestion: any = await this.saveQuestions(parent_id, form);
          question_id = savedQuestion?.savedQuestionId?.toString();
        } catch (error){console.error('Error while saving questions:', error);}

        try {
          const response_id_validated = response_id ? response_id : '';
          const question_id_validated = question_id ? question_id : '';
          await this.formService.updateFormWithIDs(parent_id!, response_id_validated, question_id_validated).toPromise();
          console.log('Form updated with IDs:', parent_id, response_id, question_id);

        }
        catch (error) {console.error('Error while updating form:', error);}



      },
      (error) => {
        console.error('Error while saving form:', error);
      }

    );

    //this.form = form?._id;
    //this.form = parent_id;
    this.showVoteFormIdPopup = true;
  }


  async saveResponses(ID: String): Promise<string> {
    try {
      const response = await this.formService.saveResponses(ID).toPromise();
      return await response;
    } catch (error) {
      // Handle errors here if needed
      console.error('Error while saving responses:', error);
      throw error;
    }
  }
  async saveQuestions(ID: String, form: any): Promise<string>{
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
    try {
      const response = await this.formService.saveQuestions(questions).toPromise();
      return await response;
    } catch (error) {
      console.error('Error while saving questions:', error);
      throw error;
    }

  }

  //this.navigateToHomePage();
  navigateToHomePage() {
    this.router.navigate(['/']);
  }

}





