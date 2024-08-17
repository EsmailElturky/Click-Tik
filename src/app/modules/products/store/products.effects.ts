import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './products.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductsService } from '../services/products/products.service';
import { ProductsListResponseInterface } from '../interfaces/products-list-response.interface';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap((action) =>
        this.productsService
          .getProducts(action.limit, action.skip, action.search)
          .pipe(
            map((response: ProductsListResponseInterface) =>
              ProductActions.loadProductsSuccess({
                products: response.products,
                total: response.total,
                skip: response.skip,
                limit: response.limit,
              }),
            ),
            catchError((error) =>
              of(
                ProductActions.loadProductsFailure({
                  error: 'failed to get products',
                }),
              ),
            ),
          ),
      ),
    ),
  );

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadCategories),
      mergeMap(() =>
        this.productsService.getProductCategories().pipe(
          map((categories) =>
            ProductActions.loadCategoriesSuccess({ categories }),
          ),
          catchError((error) =>
            of(
              ProductActions.loadCategoriesFailure({
                error: 'failed to get categories',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  loadProductsByCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.selectCategory),
      mergeMap((action) =>
        this.productsService.getProductsByCategory(action.category, 10, 0).pipe(
          map((response: ProductsListResponseInterface) =>
            ProductActions.loadProductsSuccess({
              products: response.products,
              total: response.total,
              skip: response.skip,
              limit: response.limit,
            }),
          ),
          catchError((error) =>
            of(
              ProductActions.loadProductsFailure({
                error: 'failed to get products',
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
