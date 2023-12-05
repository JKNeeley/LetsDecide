
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CastVoteService } from './cast-vote.service';
import { NgModel } from '@angular/forms';
import { Results } from '../results/results.model';
import { Form, Questions } from './form.model';
import { concatWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cast-vote',
  templateUrl: './cast-vote.component.html',
  styleUrls: ['./cast-vote.component.css']
})
export class CastVoteComponent {

  form!: Form;
  question_id!: string;
  questions!: Questions;
  choices!: string[];
  isDataAvailable:number = 0;


  constructor(
    private voteService: CastVoteService,
    private route: ActivatedRoute,
    ){

    }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.voteService.getForm(id).subscribe((formData) => {
      this.form = formData;
      console.log(this.form);
      this.question_id = this.form.Questions_ID;

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
    console.log(submission);


  }
}
