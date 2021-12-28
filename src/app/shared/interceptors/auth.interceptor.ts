import { UserService } from './../services/user-service.service';
import { UserToken } from './../models/user-models';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';

@Injectable()

// TODO CREATE A WAY TO LOG THE USER OUT IF THE USER IS UNAUTHORIZED
// TODO IN USER SERVICE ADD FLAG FOR FORCED LOGOUT
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("Token")
    if(token) {
    const userToken: UserToken = JSON.parse(token)
      const clonedReq = req.clone({ // clones the request so we can add modifications
        headers: req.headers.set("Authorization", userToken.token)
      })
      return next.handle(clonedReq).pipe(tap((res) => {

      }, (err) => { // TODO CHECK TO MAKE SURE THIS ERROR IS RELATED TO THE TOKEN ITSELF
        this.checkForAuthenticationError(err)
        // this.userService.logout()
      }))
    } else {

      return next.handle(req)
    }
  }

  checkForAuthenticationError(err: HttpErrorResponse) {
    if(err.error.message === "Unauthorized" || err.error.message === "Problem occured during authorization")
      this.userService.logout()

  }
}

// TODO add error handler here for checking if the error occurs because of the token itself
