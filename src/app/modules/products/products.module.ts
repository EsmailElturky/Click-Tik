import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './pages/products/products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { StoreModule } from '@ngrx/store';
import { productsReducer } from './store/products.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './store/products.effects';

@NgModule({
  declarations: [ProductsComponent, ProductCardComponent, PaginatorComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    StoreModule.forFeature('products', productsReducer),
    EffectsModule.forFeature([ProductsEffects]),
    SharedModule,
    FormsModule,
  ],
})
export class ProductsModule {}
