import { UserLogin, UserToken } from './../models/user-models';
import { RegisteredUser, UserRegister } from '../models/user-models';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Injectable()
export class UserService {
  userToken!: UserToken | null

  constructor(private httpClient: HttpClient) {}

   registerUser(registerUserForm: FormGroup): Observable<any> {
     let user = this.buildRegisterUserRequest(registerUserForm)
     const url = "http://localhost:4200/api/user/register"
     return this.httpClient.post<RegisteredUser>(url, user, {observe: 'response'})
      .pipe(catchError(this.handleError))
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

  loginUser(userDetails: UserLogin) {
    const url ="http://localhost:4200/api/user/login"
     this.httpClient.post<UserToken>(url, userDetails, {observe: 'response'} )
     .pipe(catchError( err => this.handleError(err)))
     .subscribe((res) => {
       if (res){
         this.userToken = res.body
       }
     })
  }

  filterLoginErrors(errMessage: string ): string {
    switch (errMessage){
      case 'INVALID_LOGIN':
        return 'Invalid Email Or Password'
      case 'INVALID_USER_LOGIN_OBJECT':
        return 'Please Enter Information Into All Fields'
      default:
        return 'Error Logging In. Please Try Again Later'
    }
  }

  filterRegistrationErrors(errMessage: string): string {
    switch (errMessage){
      case 'INVALID_USER_OBJECT':
        return 'Please Enter Information Into All Fields'
      case 'USER_ALREADY_REGISTERED':
        return 'User Already registered'
      default:
        return 'Error Registering User'
    }
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error)
  }
}
