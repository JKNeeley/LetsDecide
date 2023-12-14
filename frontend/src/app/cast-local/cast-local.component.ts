
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
  hasVoted: boolean = false;

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
      
      if(this.voteEnded() == -1 || this.form.State == 2){ this.endLocalVote();return;}// Voting time has passed or the vote is already over

      if(this.form.State == 0){ return; }// Form is not in the 'ready to be voted on state' display nothing

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
    if(Object.keys(this.choices).length == 0){ return; }
    this.hasVoted = true;

    let response: Object = {
      response_id: this.form.Responses_ID,
      Responses: {
        Parent_Form_ID: this.form._id,
        Answers: transformedAnswers
      }};

    if(this.voteEnded() == -1){ this.endLocalVote();return;}
    
    //add response to database
    this.voteService.addResponse(response).subscribe();

    //reset form field answers due to local voting
    this.choices = [];
  }

  endLocalVote(){

    this.voteService.endVote(this.form._id);// Set form State to 2    
    const url = '../results/' + this.form._id
    this.router.navigate([url]);
  }

  voteEnded()
  {
    // Check to see if current time is past the end time of the form | must convert Time_Close to a Date to use .getTime() and compare
    const currentTime: Date = new Date();
    const formTimeClose: Date = this.form.Time_Close instanceof Date ? this.form.Time_Close : new Date(this.form.Time_Close);
    if(currentTime.getTime() > formTimeClose.getTime()) { return -1;} // Past Time_Close
    return 0;// Before Time_Close
  }

}
