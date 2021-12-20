import { UserService } from './shared/services/user-service.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [UserService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
