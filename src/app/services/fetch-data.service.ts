import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { OrderFormRequestInterface } from '../models/order-form-request.interface';

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  constructor(private http: HttpClient) {}

  sendOrder(url: string, formValue: OrderFormRequestInterface) {
    return this.http.post(url, formValue);
  }
}
