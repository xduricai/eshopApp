import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { RestService } from '../rest.service';
import { CartService } from '../cart.service';
import { AdvertService } from '../advert.service';

// komponent home stranky
// pri inicializacii nacita vsetky produkty z databazy a vyrenderuje ich na obrazovku
// ak je produkt vypredany, znamena to, ze vsetky jeho kusy v databaze uz patria do nejakej objednavky
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private rest: RestService, public products: ProductsService, public cart: CartService, private ad: AdvertService) { }

  ngOnInit(): void {
    this.products.emptyProducts();
    
    let data = this.rest.dbProducts();
    data.subscribe(res => {
      Object.entries(res).forEach((entry) => {
        let data = entry[1];
        this.products.addProduct(data.product_type, data.price, data.img, data.order_id)
      });
    });
    this.ad.updateAdvert(this.rest.getAdvert());
  }
} 
