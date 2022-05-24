import { Injectable } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { Router } from '@angular/router';
import { Product } from './product';

// service na implementaciu kosika pre nakup
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private router: Router) { }

  cart_count: number = 0;
  cart_items: Array<Product> = [];

  addToCart(product:Product){
    product.quantity--;
    this.cart_count++;
    this.cart_items.push(product);
    console.log(product.quantity)
  }

  emptyCart(){
    while (this.cart_items.length > 0){
      this.cart_items[0].quantity++;
      this.cart_items.shift();
      this.cart_count--;
    }
    this.router.navigate(['']);
  }

  totalCost(){
    let total = 0;

    this.cart_items.forEach((item) => {
      total += item.price;
    });

    return (Math.round(total * 100) / 100);
  }
}
