import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Results } from './results.model';
import { ResultsService } from './results.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})



export class ResultsComponent implements OnInit{

  results: any;
  num_questions: any;
  isDataAvailable:boolean = false;

  constructor(
    private route: ActivatedRoute,
    public resultsService: ResultsService
  ){};

  ngOnInit() {
    console.log('oninit called');
    const id = this.route.snapshot.paramMap.get('id');
    this.resultsService.getResult(id).subscribe((res) => {
        this.results = res;
        console.log('this res');
        console.log(this.results);
        this.isDataAvailable = true;

        this.num_questions = this.results.questions.length;
        console.log('numq' + this.num_questions);
      })
  }
}
