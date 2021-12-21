import { RegisteredUser, UserRegister } from '../models/user-models';
import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) {}

   registerUser(registerUserForm: FormGroup): Observable<any> {
     let user = this.buildRegisterUserRequest(registerUserForm)
     const url = "http://localhost:4200/api/user/register"
     return this.httpClient.post<RegisteredUser>(url, user)
      .pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error)
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


}
