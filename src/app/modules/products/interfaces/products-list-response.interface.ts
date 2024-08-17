import { Product } from './product.interface';

export interface ProductsListResponseInterface {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
