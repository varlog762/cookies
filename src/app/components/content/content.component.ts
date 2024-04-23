import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';

import { ProductInterface } from '../../models/product.interface';
import { FetchDataService } from '../../services/fetch-data.service';
import { OrderResponseInterface } from '../../models/order-response.interface';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public currency = '$';
  public productsData!: ProductInterface[];
  public sendOrderSubscription$!: Subscription;
  public productsDataSubscription$!: Subscription;

  constructor(
    private fb: FormBuilder,
    private fetchDataService: FetchDataService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getProducts();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      product: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  scrollTo(target: HTMLElement, product?: ProductInterface): void {
    target.scrollIntoView({ behavior: 'smooth' });
    if (product) {
      this.form.patchValue({
        product: `${product.title} (${product.price} ${this.currency})`,
      });
    }
  }

  changeCurrency(): void {
    let newCurrency: string = '$';
    let coefficient: number = 1;

    switch (this.currency) {
      case '$':
        newCurrency = '₽';
        coefficient = 90;
        break;
      case '₽':
        newCurrency = 'BYN';
        coefficient = 3;
        break;
      case 'BYN':
        newCurrency = '€';
        coefficient = 0.9;
        break;
      case '€':
        newCurrency = '¥';
        coefficient = 6.9;
        break;
    }

    this.currency = newCurrency;

    this.productsData.forEach((item: ProductInterface) => {
      item.price = +(item.basePrice * coefficient).toFixed(1);
    });
  }

  getProducts(): void {
    this.productsDataSubscription$ = this.fetchDataService
      .getProducts('https://testologia.ru/cookies')
      .subscribe(response => (this.productsData = response));
  }

  confirmOrder(): void {
    if (this.form.valid) {
      this.sendOrderSubscription$ = this.fetchDataService
        .sendOrder('https://testologia.ru/cookies-order', this.form.value)
        .subscribe((response: OrderResponseInterface) => {
          alert(response.message);
          this.form.reset();
        });
    }
  }

  ngOnDestroy(): void {
    this.sendOrderSubscription$.unsubscribe();
  }
}
