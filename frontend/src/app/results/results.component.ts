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

  result: Results | null = null;

  constructor(
    private route: ActivatedRoute,
    public resultsService: ResultsService
  ){}

  ngOnInit() {
    console.log('oninit called');
    const id = this.route.snapshot.paramMap.get('id')

    this.resultsService.getResult(id)?.subscribe((result) => {
        this.result = result;
        console.log(this.result)
        console.log('end')
      })


  }
}
