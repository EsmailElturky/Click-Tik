import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './products.actions';
import { Product } from '../interfaces/product.interface';

export interface ProductsState {
  products: Product[];
  categories: string[];
  selectedCategory: string;
  search: string;
  total: number;
  skip: number;
  limit: number;
  error: string | null;
  cart: Product[];
}

export const initialState: ProductsState = {
  products: [],
  categories: [],
  selectedCategory: 'All',
  search: '',
  total: 0,
  skip: 0,
  limit: 10,
  error: null,
  cart: [],
};

export const productsReducer = createReducer(
  initialState,
  on(
    ProductActions.loadProductsSuccess,
    (state, { products, total, skip, limit }) => ({
      ...state,
      products,
      total,
      skip,
      limit,
      error: null,
    }),
  ),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ProductActions.loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories: ['All', ...categories],
    error: null,
  })),
  on(ProductActions.loadCategoriesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ProductActions.selectCategory, (state, { category }) => ({
    ...state,
    selectedCategory: category,
  })),
  on(ProductActions.searchProducts, (state, { search }) => ({
    ...state,
    search,
  })),
  on(ProductActions.addToCart, (state, { product }) => ({
    ...state,
    cart: [...state.cart, product],
  })),
);
