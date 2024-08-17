import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
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
  category = 'smart phones';
  searchText = 'Iphone';
  selectedCategory = 'All';

  products$: Observable<Product[]>;
  categories$: Observable<string[]>;
  selectedCategory$: Observable<string>;
  error$: Observable<string>;
  cart$: Observable<Product[]>;
  total$: Observable<number>;

  constructor(
    private store: Store<ProductsState>,
    private toaster: ToasterService,
  ) {
    this.products$ = this.store.select(ProductSelectors.selectAllProducts);
    this.categories$ = this.store.select(ProductSelectors.selectCategories);
    this.selectedCategory$ = this.store.select(
      ProductSelectors.selectSelectedCategory,
    );
    this.error$ = this.store.select(ProductSelectors.selectError);
    this.cart$ = this.store.select(ProductSelectors.selectCart);
    this.total$ = this.store.select(ProductSelectors.selectTotal);
  }

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts({ limit: 10, skip: 0 }));
    this.store.dispatch(ProductActions.loadCategories());
    this.error$.subscribe((error) => {
      this.toaster.showError(error);
    });
    this.total$.subscribe((total) => {
      this.totalPages = total / this.limit;
    });
  }

  onCategoryChange(category: string): void {
    if (category === 'All') {
      this.store.dispatch(
        ProductActions.loadProducts({ limit: 10, skip: 0, search: '' }),
      );
    } else {
      this.store.dispatch(ProductActions.selectCategory({ category }));
    }
  }

  onSearchChange(search: string): void {
    console.log(search);
    this.store.dispatch(ProductActions.searchProducts({ search }));
    this.store.dispatch(
      ProductActions.loadProducts({ limit: 10, skip: 0, search }),
    );
  }

  addToCart(product: Product): void {
    this.store.dispatch(ProductActions.addToCart({ product }));
  }

  onPageChange(page: number): void {
    const limit = 10;
    const skip = (page - 1) * limit;
    this.store.dispatch(ProductActions.loadProducts({ limit, skip }));
  }

  ngAfterViewInit() {
    this.templateToPass = this.headerTemplate;
  }
}
