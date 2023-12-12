
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CastVoteService } from './cast-local.service';
import { NgModel } from '@angular/forms';
import { Results } from '../results/results.model';
import { Form, Questions } from './form.model';
import { concatWith } from 'rxjs/operators';
import { Observable, empty } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cast-vote',
  templateUrl: './cast-local.component.html',
  styleUrls: ['./cast-local.component.css']
})
export class CastLocalComponent {

  form: Form = {} as Form; // Assuming Form is an interface or class
  questions: Questions = {} as Questions; // Assuming Questions is an interface or class
  choices: string[] = []; // Initializing choices as an empty array
  isDataAvailable: number = 0;

  resetFields() {
    //this.form = {} as Form;
    //this.questions = {} as Questions;
    this.choices = [];
    //this.isDataAvailable = 2;
  }
  constructor(
    private voteService: CastVoteService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
    ){

    }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.voteService.getForm(id).subscribe((formData) => {
      this.form = formData.form;
      //console.log(this.form);
      console.log(this.form.Title);
      console.log(this.form.Description);
      this.isDataAvailable += 1;
    });

    this.voteService.getFormQuestions(id).subscribe((qData) => {
      this.questions = qData.questions;
      console.log(this.questions);
      this.choices = new Array(this.questions.Questions.length);

      this.isDataAvailable += 1;
    });

  }

  submitResponse(submission: any){
    const transformedAnswers = this.choices.map(item => [item]);
    let response: Object = {
      response_id: this.form.Responses_ID,
      Responses: {
        Parent_Form_ID: this.form._id,
        Answers: transformedAnswers
      }};

     //add response to database
    this.voteService.addResponse(response).subscribe();

    //reset form field answers due to local voting
    this.choices = [];
  }

  endLocalVote(){
    const url = '../results/' + this.form._id
    this.router.navigate([url]);
  }
}
