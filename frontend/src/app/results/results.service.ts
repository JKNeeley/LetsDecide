import{ HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Results } from './results.model';

@Injectable({
  providedIn: 'root'
})

export class ResultsService {
  constructor(private http: HttpClient){}

  getResult(id: string | null): Observable<Results> {
    console.log('GetResult called')
    console.log(id)
    return this.http.get<Results>('http://localhost:3000/api/forms/result/' + id)
  }

}
