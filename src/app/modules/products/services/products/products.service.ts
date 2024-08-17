import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/services/http/http.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpService) {}

  /**
   * Fetches products with pagination and optional search query.
   *
   * @param {number} limit - The maximum number of products to return.
   * @param {number} skip - The number of products to skip for pagination.
   * @param {string} [search] - Optional search query to filter products.
   */
  getProducts(limit: number, skip: number, search?: string) {
    const url = search
      ? `products/search?q=${search}&limit=${limit}&skip=${skip}`
      : `products?limit=${limit}&skip=${skip}`;
    return this.http.get(url);
  }

  /**
   * Fetches the list of product categories.
   */
  getProductCategories() {
    return this.http.get('products/category-list');
  }

  /**
   * Fetches products by category with pagination.*
   */
  getProductsByCategory(category: string, limit: number, skip: number) {
    return this.http.get(
      `products/category/${category}?limit=${limit}&skip=${skip}`,
    );
  }
}
