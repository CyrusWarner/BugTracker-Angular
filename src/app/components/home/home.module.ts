import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { NavbarComponent } from '../navbar/navbar.component';
import { BoardFormComponent } from './board-form/board-form.component';
import { InvitedBoardsComponent } from './invited-boards/invited-boards.component';



@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    BoardFormComponent,
    InvitedBoardsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule { }
