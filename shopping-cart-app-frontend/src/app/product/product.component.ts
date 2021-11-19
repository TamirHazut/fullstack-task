import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  getName(): string {
    return (this.product ? this.product.getName() : '');
  }

  getPrice(): number {
    return (this.product ? this.product.getPrice() : 0);
  }

  getPicture(): string {
    return (this.product ? this.product.getImagePath() : '');
  }

}
