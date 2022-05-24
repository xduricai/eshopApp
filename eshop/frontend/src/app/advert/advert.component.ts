import { Component, OnInit } from '@angular/core';
import { AdvertService } from '../advert.service';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';

//komponent pre reklamu
@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.css']
})
export class AdvertComponent implements OnInit {

  constructor(private router: Router, public ad: AdvertService, private rest: RestService) { }

  url:any;
  img:any;

  ngOnInit(): void {
    this.rest.counterUp().subscribe(res=>{
      this.ad.counter = res[0].ad_counter;
    });
    this.ad.updateAdvert(this.rest.getAdvert());
    this.img = localStorage.getItem("img");
    this.url = localStorage.getItem("url");
  }

  toHome(){
    this.router.navigate(['']);
  }
}
