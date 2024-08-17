import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, AfterViewInit {
  // A reference to the header template.
  @ViewChild('headerTemplate') headerTemplate!: TemplateRef<any>;
  templateToPass!: TemplateRef<any>;
  count = 0;
  category = 'smart phones';
  searchText = 'Iphone';
  categories = [
    { name: 'All', count: 240 },
    { name: 'Smartphones', count: 9 },
    { name: 'Laptops', count: 12 },
    { name: 'Fragrances', count: 8 },
    { name: 'Skincare', count: 16 },
    { name: 'Groceries', count: 12 },
    { name: 'Home decoration', count: 4 },
    { name: 'Furniture', count: 4 },
    { name: 'Tops', count: 42 },
    { name: 'Women’s dresses', count: 40 },
    { name: 'Women’s shoes', count: 12 },
    { name: 'Men’s shirts', count: 2 },
    { name: 'Men’s shoes', count: 10 },
    { name: 'Men’s watches', count: 15 },
    { name: 'Women’s watches', count: 7 },
    { name: 'Women’s bags', count: 9 },
    { name: 'Women’s jewellery', count: 5 },
    { name: 'Sunglasses', count: 13 },
    { name: 'Automotive', count: 6 },
    { name: 'Motorcycle', count: 14 },
    { name: 'Lighting', count: 0 },
  ];

  selectedCategory = 'All';
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.templateToPass = this.headerTemplate;
  }
  addToCart() {
    this.count++;
    console.log('Product added to cart', this.count);
  }
}
