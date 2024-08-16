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

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.templateToPass = this.headerTemplate;
  }
}
