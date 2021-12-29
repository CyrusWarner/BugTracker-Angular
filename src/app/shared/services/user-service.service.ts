import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage-service.service';
import { UserLogin, UserToken, User } from './../models/user-models';
import { RegisteredUser, UserRegister } from '../models/user-models';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import jwtDecode from 'jwt-decode';
@Injectable()
export class UserService {
  userToken!: UserToken | null
  currentUser?: User

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router,
    )
    {}

   registerUser(registerUserForm: FormGroup) {
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
       if (res && res.body){
         this.userToken = res.body
         this.localStorageService.storeItemInLocalStorage('Token', res.body)
         this.currentUser = this.decodeUserToken(this.userToken.token)
         this.router.navigate(['/home'])
       }
     })
  }

  decodeUserToken(token: string):User {
      const user:User = jwtDecode(token);
      return user
  }

  logout() {
    this.localStorageService.clearLocalStorage()
  }

  // TODO check to make sure the user is valid in the GO user service
  getUserFromLocalStorage() {
    let userToken: UserToken = this.localStorageService.getItemInLocalStorage('Token')
    if(!userToken){
      this.router.navigate(['/login'])
    } else {
      this.router.navigate(['/home'])
      this.currentUser = this.decodeUserToken(userToken.token)
      this.userToken = userToken
    }
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
