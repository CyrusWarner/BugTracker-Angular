import { RegisteredUser, UserRegister } from '../models/user-models';
import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) {}

   registerUser(registerForm: FormGroup): Observable<any> {
     const userToRegister = this.buildRegisteringuser(registerForm)
     const url = "localhost:4000/api/user/register"
     return this.httpClient.post(url, userToRegister)
      .pipe(catchError(err => {
        return of(err)
      }))
  }

  // builds the registering user object and returns it
  buildRegisteringuser(registerForm: FormGroup): UserRegister {
    let userToRegister: UserRegister = {
      firstName: registerForm.controls["firstName"].value,
      lastName: registerForm.controls["lastName"].value,
      email: registerForm.controls["email"].value,
      password: registerForm.controls["password"].value
    }
    return userToRegister
  }
}
