import { Injectable } from '@angular/core';  
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable()
export class ProductCartService {
    public endPoint: string | undefined;  

    constructor(private http: HttpClient) { }  

    getCartItems() {
        if (!this.endPoint) {
            return undefined;
        }  
        return this.http.get(this.endPoint) as Observable<Product[]>;
    }

    deleteProduct(body: JSON) {
        if (!this.endPoint) {
            return undefined;
        }  
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: body,
            };
        return this.http.delete(this.endPoint, options);
    }


}