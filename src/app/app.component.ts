import { UserService } from './shared/services/user-service.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'bugtracker-angular';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUserFromLocalStorage()
  }

  getUserFromLocalStorage() {
    this.userService.getUserFromLocalStorage()

  }
}
