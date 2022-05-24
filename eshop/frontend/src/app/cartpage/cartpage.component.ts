import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../cart.service';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { AdvertService } from '../advert.service';

//komponent pre kosik
//generuje formular, pre pouivatelske udaje
@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.css']
})
export class CartpageComponent implements OnInit {

  userInfo: FormGroup;

  constructor(private fb: FormBuilder, public cart: CartService, private rest: RestService, private router: Router, private ad: AdvertService) {
    this.userInfo = this.fb.group({
    });
   }

  ngOnInit(): void {
    this.userInfo = this.fb.group({
      email: ['',[
        Validators.required,
        Validators.email
      ]],
      name: ['',[
        Validators.required,
        Validators.minLength(3)
      ]],
      street: ['',[
        Validators.required,
        Validators.minLength(3)
      ]],
      streetnum: ['',[
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.min(1),
        Validators.max(99)
      ]],
      city:['',[
        Validators.required,
        Validators.minLength(3)
      ]],
      pcode: ['',[
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.min(1),
        Validators.max(99999)
      ]]
    });

    this.ad.updateAdvert(this.rest.getAdvert());
  }

  submitInfo(){
    let data = {
      user: this.userInfo.value,
      cart: this.cart.cart_items
    }
    this.rest.sendOrder(JSON.stringify(data));
    this.cart.cart_count = 0;
    this.cart.cart_items.length = 0;
    this.router.navigate([`${localStorage.getItem("url")}`]);
  }

  get email() {
    return this.userInfo.get('email');
  }
  get name() {
    return this.userInfo.get('name');
  }
  get street() {
    return this.userInfo.get('street');
  }
  get streetnum() {
    return this.userInfo.get('streetnum');
  }
  get city() {
    return this.userInfo.get('city');
  }
  get pcode() {
    return this.userInfo.get('pcode');
  }
}
