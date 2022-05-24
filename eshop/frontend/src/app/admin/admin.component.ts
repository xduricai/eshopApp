import { Component, OnInit } from '@angular/core';
import { AdvertService } from '../advert.service';
import { RestService } from '../rest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// admin komponent
// pri inicializacii nacita vsetky objednavky z DB
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public ad: AdvertService, private rest: RestService, private fb: FormBuilder) { 
    this.adForm = this.fb.group({
    });
  }

  orders: Array<any> = [];
  products: Array<any> = [];
  adForm: FormGroup;

  ngOnInit(): void {
    this.ad.updateAdvert(this.rest.getAdvert());
    this.rest.getOrders().subscribe(res=>{
      Object.entries(res).forEach(entry=>{
        this.orders.push(entry[1]);
      });
    });
    this.rest.getProducts().subscribe(res=>{
      Object.entries(res).forEach(entry=>{
        this.products.push(entry[1]);
      });
    });

    this.adForm = this.fb.group({
      image: ['',[
        Validators.required,
        Validators.minLength(5)
      ]],
      link: ['',[
        Validators.required,
        Validators.minLength(2)
      ]]
    });
  }
  // zaplatenie objednavky
  payOrder(orderID:number){
    let message = {
      id: orderID
    }

    this.rest.pay(JSON.stringify(message)).subscribe(res=>{
      this.orders.length = 0;
      Object.entries(res).forEach(entry=>{
        this.orders.push(entry[1]);
      });
    });
  }
  // zmena reklamy
  updateAdvert(){
    this.rest.changeAdvert(JSON.stringify(this.adForm.value)).subscribe((res:any)=>{
      localStorage.setItem("url", res[0].link);
      localStorage.setItem("img", res[0].image);
    });
    this.adForm.reset();
  }

  get image() {
    return this.adForm.get('image');
  }
  get link() {
    return this.adForm.get('link');
  }
}
