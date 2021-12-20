import { UserRegister } from '../models/user-models';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) {}

   registerUser(userToRegister: UserRegister) {
    console.log("here")
  }
}
