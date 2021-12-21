import { RegisteredUser, UserRegister } from '../models/user-models';
import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) {}

   registerUser(userToRegister: UserRegister): Observable<any> {
     const url = "localhost:4000/api/user/register"
     return this.httpClient.post(url, userToRegister)
      .pipe(catchError(err => {
        return of(err)
      }))
  }
}
