import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/product.interface';
import { Store } from '@ngrx/store';
import { ProductsState } from '../../store/products.reducer';
import * as ProductSelectors from '../../store/products.selectors';
import * as ProductActions from '../../store/products.actions';
import { ToasterService } from '../../../../shared/services/toaster/toaster.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, AfterViewInit {
  // A reference to the header template.
  @ViewChild('headerTemplate') headerTemplate!: TemplateRef<any>;

  templateToPass!: TemplateRef<any>;
  totalPages = 1;
  currentPage = 1;
  limit = 10;
  searchText = '';
  selectedCategory = 'All';

  products$: Observable<Product[]>;
  categories$: Observable<string[]>;
  selectedCategory$: Observable<string>;
  error$: Observable<string>;
  cart$: Observable<Product[]>;
  total$: Observable<number>;

  constructor(private store: Store<ProductsState>, private toaster: ToasterService) {
    this.products$ = this.store.select(ProductSelectors.selectAllProducts);
    this.categories$ = this.store.select(ProductSelectors.selectCategories);
    this.selectedCategory$ = this.store.select(ProductSelectors.selectSelectedCategory);
    this.error$ = this.store.select(ProductSelectors.selectError);
    this.cart$ = this.store.select(ProductSelectors.selectCart);
    this.total$ = this.store.select(ProductSelectors.selectTotal);
  }

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts({ limit: 10, skip: 0 }));
    this.store.dispatch(ProductActions.loadCategories());
    this.error$.subscribe((error) => {
        if (error) {
            this.toaster.showError(error);
        }
    });
    this.total$.subscribe((total) => {
      this.totalPages = Math.ceil( total / this.limit);
    });
  }

  /**
   * Handles the change of product category.
   * Clears the search text and dispatches actions to load products or select a category.
   */
  onCategoryChange(category: string): void {
    this.searchText = '';
    if (category === 'All') {
      this.store.dispatch(ProductActions.loadProducts({ limit: 10, skip: 0, search: '' }));
    } else {
      this.store.dispatch(ProductActions.selectCategory({ category }));
    }
  }

  /**
   * Handles the change of search text.
   * Dispatches an action to load products based on the search query.
   */
  onSearchChange(search: string): void {
    this.store.dispatch(ProductActions.loadProducts({ limit: 10, skip: 0, search }));
  }

  addToCart(product: Product): void {
    this.store.dispatch(ProductActions.addToCart({ product }));
  }

  onPageChange(page: number): void {
    const limit = 10;
    const skip = (page - 1) * limit;
    this.store.dispatch(ProductActions.loadProducts({ limit, skip }));
  }

  /**
   * Lifecycle hook that is called after Angular has fully initialized a component's view.
   * Sets the template to pass to the header template.
   */
  ngAfterViewInit() {
    this.templateToPass = this.headerTemplate;
  }
}
