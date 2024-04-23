import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { OrderRequestInterface } from '../models/order-request.interface';
import { OrderResponseInterface } from '../models/order-response.interface';

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  constructor(private http: HttpClient) {}

  sendOrder(
    url: string,
    formValue: OrderRequestInterface
  ): Observable<OrderResponseInterface> {
    return this.http.post<OrderResponseInterface>(url, formValue);
  }
}
