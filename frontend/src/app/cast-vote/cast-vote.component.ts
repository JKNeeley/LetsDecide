
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CastVoteService } from './cast-vote.service';
import { NgModel } from '@angular/forms';
import { Results } from '../results/results.model';
import { Form, Questions } from './form.model';
import { concatWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cast-vote',
  templateUrl: './cast-vote.component.html',
  styleUrls: ['./cast-vote.component.css']
})
export class CastVoteComponent {

  form!: Form;
  questions!: Questions;
  choices!: string[];
  isDataAvailable:number = 0;


  constructor(
    private router: Router,
    private voteService: CastVoteService,
    private route: ActivatedRoute,
    ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.voteService.getForm(id).subscribe((formData) => {
      this.form = formData.form;
      console.log(this.form);
      console.log(this.form.Description);
      this.isDataAvailable += 1;

      if(this.voteEnded() == -1 || this.form.State == 2){
        this.voteService.endVote(this.form._id);// Set form State to 2
        const url = '../results/' + this.form._id
        this.router.navigate([url])
      }// Voting time has passed or the vote is already over

      if(this.form.State == 0){ return; }// Form is not in the 'ready to be voted on state' display nothing
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

    //console.log(response);
    //add response to database
    this.voteService.addResponse(response).subscribe();
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
