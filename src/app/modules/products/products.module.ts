import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './pages/products/products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from './components/paginator/paginator.component';

@NgModule({
  declarations: [ProductsComponent, ProductCardComponent, PaginatorComponent],
  imports: [CommonModule, ProductsRoutingModule, SharedModule, FormsModule],
})
export class ProductsModule {}
