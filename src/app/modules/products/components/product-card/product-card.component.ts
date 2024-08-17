import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  @Output() addToCart = new EventEmitter();
  oldPrice: number;

  ngOnInit(): void {
    this.oldPrice =
      this.product.price * (1 + this.product.discountPercentage / 100);
    // Round to 2 decimal places
    this.oldPrice = Math.round(this.oldPrice * 100) / 100;
  }
}
