import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdvertComponent } from './advert/advert.component';
import { CartpageComponent } from './cartpage/cartpage.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cart', component: CartpageComponent},
  {path: 'admin', component: AdminComponent},
  {path: ':url', component: AdvertComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
