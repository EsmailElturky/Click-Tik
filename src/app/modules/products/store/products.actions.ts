import { createAction, props } from '@ngrx/store';
import { Product } from '../interfaces/product.interface';

export const loadProducts = createAction(
  '[Products] Load Products',
  props<{ limit: number; skip: number; search?: string }>(),
);

export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: Product[]; total: number; skip: number; limit: number }>(),
);

export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: any }>(),
);

export const loadCategories = createAction('[Products] Load Categories');

export const loadCategoriesSuccess = createAction(
  '[Products] Load Categories Success',
  props<{ categories: string[] }>(),
);

export const loadCategoriesFailure = createAction(
  '[Products] Load Categories Failure',
  props<{ error: any }>(),
);

export const selectCategory = createAction(
  '[Products] Select Category',
  props<{ category: string }>(),
);

export const searchProducts = createAction(
  '[Products] Search Products',
  props<{ search: string }>(),
);

export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ product: Product }>(),
);
