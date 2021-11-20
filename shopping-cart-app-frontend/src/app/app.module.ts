import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { APIInterceptor } from './injectables/api.interceptor';
import { SearchService } from './services/search.service';
import { ProductCartService } from './services/product-cart.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductsComponent,
    AutoCompleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: APIInterceptor,
    multi: true,
  },
  SearchService,
  ProductCartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
