import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CastLocalService {

  private apiUrl = 'http://your-backend-api-url';

  constructor(private http: HttpClient) {}

  getVoteDetails(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/vote/details`);
  }
}
