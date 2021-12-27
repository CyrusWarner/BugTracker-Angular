import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [HomeComponent, NavbarComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule { }
