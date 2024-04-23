import { createReducer, on } from '@ngrx/store';
import { ProductsActions } from './products.actions';

export const productsFeatureKey = 'products';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
);

