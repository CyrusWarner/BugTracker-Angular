import { UserService } from './../services/user-service.service';
import { UserToken } from './../models/user-models';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
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

      }, (err) => { // TODO log this error at some point
        this.userService.logout()
      }))
    } else {

      return next.handle(req)
    }
  }
}

// TODO add error handle
