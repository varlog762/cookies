import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';

import { ProductInterface } from '../../models/product.interface';
import { FetchDataService } from '../../services/fetch-data.service';
import { OrderResponseInterface } from '../../models/order-response.interface';
import { ProductsActions } from '../../store/actions/products.actions';
import { productsFeature } from '../../store/features/products.feature';

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
    private fetchDataService: FetchDataService,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();

    this.store.dispatch(ProductsActions.loadProducts());
  }

  initializeForm(): void {
    this.form = this.fb.group({
      product: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  initializeValues(): void {
    this.productsDataSubscription$ = this.store
      .select(productsFeature.selectProducts)
      .subscribe(response => (this.productsData = response));
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
    this.productsDataSubscription$.unsubscribe();
  }
}
