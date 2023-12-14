
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

      const timeClose = new Date(this.form.Time_Close);
      const currTime = new Date();
      console.log(timeClose.getTime());
      console.log(currTime.getTime());
      if (timeClose.getTime() <= currTime.getTime() || this.form.State == 2){
        //add post req to close ballot
        console.log('too late');
        this.router.navigate(['/results/' + this.form._id]);
      }
      else { console.log('ur good');}
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
}
