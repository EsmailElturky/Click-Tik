import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product = {
    id: 1,
    title: 'Wireless Bluetooth Speaker',
    description:
      'A high-quality wireless Bluetooth speaker with deep bass and crystal-clear sound.',
    category: 'Electronics',
    price: 99.99,
    discountPercentage: 10,
    rating: 4.7,
    stock: 150,
    tags: ['electronics', 'speaker', 'wireless', 'bluetooth', 'audio'],
    brand: 'SoundMax',
    sku: 'SMX12345',
    weight: 1.2, // in kilograms
    dimensions: {
      width: 15, // in centimeters
      height: 20, // in centimeters
      depth: 10, // in centimeters
    },
    warrantyInformation: '1 year manufacturer warranty.',
    shippingInformation: 'Ships within 2-3 business days.',
    availabilityStatus: 'In Stock',
    reviews: [
      {
        rating: 5,
        comment: 'Excellent sound quality and battery life.',
        date: '2024-08-10',
        reviewerName: 'John Doe',
        reviewerEmail: 'john.doe@example.com',
      },
      {
        rating: 4,
        comment: 'Great speaker, but the Bluetooth range could be better.',
        date: '2024-08-11',
        reviewerName: 'Jane Smith',
        reviewerEmail: 'jane.smith@example.com',
      },
    ],
    returnPolicy: '30-day return policy with a full refund.',
    minimumOrderQuantity: 1,
    meta: {
      createdAt: '2024-07-20T10:00:00Z',
      updatedAt: '2024-08-15T12:30:00Z',
      barcode: '1234567890123',
      qrCode: 'https://example.com/qrcode',
    },
    thumbnail: 'https://example.com/images/product-thumbnail.jpg',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://example.com/images/product-image2.jpg',
      'https://example.com/images/product-image3.jpg',
    ],
  };
  @Output() addToCart = new EventEmitter();
  oldPrice: number;

  ngOnInit(): void {
    this.oldPrice =
      this.product.price * (1 + this.product.discountPercentage / 100);
    // Round to 2 decimal places
    this.oldPrice = Math.round(this.oldPrice * 100) / 100;
  }
}
