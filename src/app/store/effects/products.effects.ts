import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { EMPTY } from 'rxjs/internal/observable/empty';

import { ProductsActions } from '../actions/products.actions';
import { FetchDataService } from '../../services/fetch-data.service';

@Injectable()
export class ProductsEffects {
  products$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      switchMap(() => {
        return this.fetchDataService
          .getProducts('https://testologia.ru/cookies')
          .pipe(
            map(products => ProductsActions.loadProductsSuccess({ products }))
          );
      }),
      catchError(() => EMPTY)
    )
  );

  constructor(
    private actions$: Actions,
    private fetchDataService: FetchDataService
  ) {}
}
