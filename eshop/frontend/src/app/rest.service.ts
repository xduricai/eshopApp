import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// service na http komunikaciu s express serverom
@Injectable({
  providedIn: 'root'
})
export class RestService {

  readonly ROOT_URL = 'http://localhost:8080'

  constructor(private http: HttpClient) { 
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  dbProducts(){
    return this.http.get(this.ROOT_URL+'/products');
  }

  getAdvert(){
    return this.http.get(this.ROOT_URL + '/advert')
  }

  changeAdvert(data: string){
    return this.http.post(this.ROOT_URL + '/update', data, this.httpOptions);
  }

  counterUp():Observable<any>{
    return this.http.get(this.ROOT_URL + '/increment');
  }

  sendOrder(order: string){
    this.http.post(this.ROOT_URL + '/order', order, this.httpOptions).subscribe();
  }

  getOrders(){
    return this.http.get(this.ROOT_URL + '/orders/all')
  }

  getProducts(){
    return this.http.get(this.ROOT_URL + '/products/assigned')
  }

  pay(id: string){
    return this.http.post(this.ROOT_URL + '/pay', id, this.httpOptions)
  }
}
