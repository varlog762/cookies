import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  constructor(private http: HttpClient) {}

  sendOrder(url: string, formValue: object) {
    return this.http.post(url, formValue);
  }
}
