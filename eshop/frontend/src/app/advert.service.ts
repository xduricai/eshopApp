import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// service pre handling reklamy
@Injectable({
  providedIn: 'root'
})
export class AdvertService {

  constructor() { }

  url: string = '';
  image: string = '';
  counter: number = 0;

  updateAdvert(data: any):void{
    data.subscribe((res:any) => {
      this.url = res[0].link;
      localStorage.setItem("url", res[0].link);
      this.image = res[0].image;
      localStorage.setItem("img", res[0].image);
      this.counter = res[0].ad_counter;
      localStorage.setItem("counter", res[0].ad_counter);
    });
  }
}
