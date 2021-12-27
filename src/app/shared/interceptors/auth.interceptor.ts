import { UserToken } from './../models/user-models';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("Token")
    if(token) {
    const userToken: UserToken = JSON.parse(token)
      const clonedReq = req.clone({ // clones the request so we can add modifications
        headers: req.headers.set("Authorization", userToken.token)
      })
      return next.handle(clonedReq)
    } else {

      return next.handle(req)
    }

  }
}
