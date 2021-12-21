import { RegisteredUser, UserRegister } from '../models/user-models';
import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) {}

   registerUser(registerUserForm: FormGroup): Observable<any> {
     let user = this.buildRegisterUserRequest(registerUserForm)
     const url = "http://localhost:4200/api/user/register"
     return this.httpClient.post(url, user)
      .pipe(catchError(err => {
        return of(err)
      }))
  }

  buildRegisterUserRequest(registerUserForm: FormGroup) {
    let user: UserRegister = {
      firstName: registerUserForm.controls['firstName'].value,
      lastName: registerUserForm.controls['lastName'].value,
      email: registerUserForm.controls['email'].value,
      password: registerUserForm.controls['password'].value
    }

    return user
  }
}
