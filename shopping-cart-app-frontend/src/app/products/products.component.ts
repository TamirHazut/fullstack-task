import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  constructor() {
    this.products = [
      new Product('43900', 'Duracell - AAA Batteries (4-Pack)', 5.49, 'http://img.bbystatic.com/BestBuy_US/images/products/4390/43900_sa.jpg'),
      new Product('48530', 'Duracell - AA 1.5V CopperTop Batteries (4-Pack)', 5.49, 'http://img.bbystatic.com/BestBuy_US/images/products/4853/48530_sa.jpg'),
      new Product('127687', 'Duracell - AA Batteries (8-Pack)', 7.49, 'http://img.bbystatic.com/BestBuy_US/images/products/1276/127687_sa.jpg'),
      new Product('150115', 'Energizer - MAX Batteries AA (4-Pack)', 5.49, 'http://img.bbystatic.com/BestBuy_US/images/products/1501/150115_sa.jpg'),
      new Product('185230', 'Duracell - C Batteries (4-Pack)', 8.99, 'http://img.bbystatic.com/BestBuy_US/images/products/1852/185230_sa.jpg'),
    ];
   }

  ngOnInit(): void {
  }

  addProduct(product: { id: string, name: string, price: number, picture: string }): void {
    this.products.push(new Product(product.id, product.name, product.price, product.picture));
  }

  removeProduct(id: string) : void {
    this.products.splice(this.products.findIndex(product => product.getID() === id), 1);
  }

  findProductByID(id: string) : Product | undefined {
    return this.products.find(product => product.getID() === id);
  }
}
