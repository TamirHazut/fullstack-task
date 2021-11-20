import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductCartService } from '../services/product-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() public endPoint: string | undefined;
  public products: Product[] | undefined;  

  constructor(private productCartService: ProductCartService) { }

  ngOnInit(): void {
    this.productCartService.endPoint = this.endPoint;
    this.getCartProducts();
   }

  getCartProducts() {
    this.productCartService.getCartItems()?.subscribe(items => {
      this.products = items;
    })
  }

  addProduct(product: { id: string, name: string, price: number, picture: string }): void {
    // this.products.push(new Product(product.id, product.name, product.price, product.picture));
  }

  removeProduct(id: string) : void {
    this.productCartService.deleteProduct(this.convertStringToJSON('id', id))?.subscribe({
      next: res => { this.getCartProducts(); },
      error: error => { console.log(error); }
    });
  }

  convertStringToJSON(property:string, value: string): JSON {
    const termJSONString = '{ "' + property + '": "' + value + '" }';
    return JSON.parse(termJSONString);
  }

  findProductByID(id: string) : Product | undefined {
    return undefined;
    // return this.products.find(product => product.getID() === id);
  }
}
