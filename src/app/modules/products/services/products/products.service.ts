import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/services/http/http.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpService) {}

  getProducts(limit: number, skip: number, search?: string) {
    const url = search
      ? `products/search?q=${search}&limit=${limit}&skip=${skip}`
      : `products?limit=${limit}&skip=${skip}`;
    return this.http.get(url);
  }
  getProductCategories() {
    return this.http.get('products/category-list');
  }
  getProductsByCategory(category: string, limit: number, skip: number) {
    return this.http.get(
      `products/category/${category}?limit=${limit}&skip=${skip}`,
    );
  }
}
