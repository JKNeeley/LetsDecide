import{ HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Results } from './results.model'

@Injectable({
  providedIn: 'root'
})

export class ResultsService {
  constructor(private http: HttpClient){}

  getResult(id: string){
    console.log('GetResult called')
    return this.http.get<{Result: Result}>('http://localhost:3000/api/forms/result/:id')
  }


}
