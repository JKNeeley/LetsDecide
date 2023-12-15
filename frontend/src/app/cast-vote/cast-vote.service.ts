import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Form, Questions } from './form.model';

@Injectable({
  providedIn: 'root'
})
export class CastVoteService {

  constructor(private http: HttpClient) {}

  backend_url: string = 'http://localhost:3000/';

  getForm(id: any): Observable<any> {
    return this.http.get<Form>(this.backend_url + 'api/forms/' + id);
  }

  getFormQuestions(id: any): Observable<any> {
    return this.http.get<Questions>(this.backend_url + 'api/form/questions/' + id);
  }

  addResponse(response: any) {
    //console.log(response);
    //console.log(this.backend_url + 'api/addResponse');
    return this.http.post<any>(this.backend_url + 'api/addResponse', response);
  }

  endVote(formId: any): Observable<any> {
    //console.log('Got the id: ',id);
    const url  = this.backend_url + 'api/forms/end-vote'
    //console.log('URL: ', url);
    return this.http.put<any>(url, {formId})
  }

}
