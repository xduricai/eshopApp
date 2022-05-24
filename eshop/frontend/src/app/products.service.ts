import { Injectable } from '@angular/core';
import { Product } from './product';

// service, ktory uklada informacie o vsetkych produktoch
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  products: Array<Product> = [];

  addProduct(name:string, price:number, image:string, order_id:any):void {
    let arr = this.products.filter(product => product.name === name)
    console.log(order_id)
    if (arr.length === 0){
      let temp: Product = {name: name, price: price, image: image, quantity: 0};
      if(order_id == null || order_id == 0){
        temp.quantity++;
      }
      this.products.push(temp);
    }

    else if(order_id == null || order_id == 0){
      arr[0].quantity++;
    }
  }

  printProducts(){
    this.products.forEach(product => console.log(product));
  }

  emptyProducts(){
    this.products.length = 0;
  }
}
