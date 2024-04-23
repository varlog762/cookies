import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { ProductInterface } from '../../models/product.interface';

export const ProductsActions = createActionGroup({
  source: 'Products',
  events: {
    'Load Products': emptyProps(),
    'Load Products Success': props<{ products: ProductInterface[] }>(),
    'Load Products Failure': emptyProps(),
  },
});
