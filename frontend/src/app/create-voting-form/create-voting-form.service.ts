import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import mongoose from 'mongoose';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  saveForm(formData: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/forms', formData);
  }

  saveResponses(ID: String): Observable<any> {
    const rsp = { Parent_Form_ID: ID, Responses: [] };
    return this.http.post<any>('http://localhost:3000/api/responses', rsp);
  }

  saveQuestions(questions: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/questions', questions);
  }

  updateFormWithIDs(formId: String, responseId: string, questionId: string): Observable<any> {
    const body = {
      responseId: responseId,
      questionId: questionId
    };
    return this.http.put<any>(`http://localhost:3000/api/forms/${formId}/update`, body);
  }
}
