import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.reducer';

export const selectProductsState =
  createFeatureSelector<ProductsState>('products');

export const selectAllProducts = createSelector(
  selectProductsState,
  (state: ProductsState) => state.products,
);

export const selectCategories = createSelector(
  selectProductsState,
  (state: ProductsState) => state.categories,
);

export const selectSelectedCategory = createSelector(
  selectProductsState,
  (state: ProductsState) => state.selectedCategory,
);

export const selectSearch = createSelector(
  selectProductsState,
  (state: ProductsState) => state.search,
);

export const selectTotal = createSelector(
  selectProductsState,
  (state: ProductsState) => state.total,
);

export const selectSkip = createSelector(
  selectProductsState,
  (state: ProductsState) => state.skip,
);

export const selectLimit = createSelector(
  selectProductsState,
  (state: ProductsState) => state.limit,
);

export const selectCart = createSelector(
  selectProductsState,
  (state: ProductsState) => state.cart,
);

export const selectError = createSelector(
  selectProductsState,
  (state: ProductsState) => state.error,
);
