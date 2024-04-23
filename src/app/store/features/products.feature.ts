import { createFeature, createReducer, on } from '@ngrx/store';
import { ProductsActions } from '../actions/products.actions';
import { ProductsStateInterface } from '../../models/products-state.interface';

export const productsFeatureKey = 'products';

export const initialState: ProductsStateInterface = {
  products: [],
};

export const productsFeature = createFeature({
  name: 'products',
  reducer: createReducer(
    initialState,
    on(ProductsActions.loadProductsSuccess, (state, { products }) => ({
      ...state,
      products: products,
    }))
  ),
});
