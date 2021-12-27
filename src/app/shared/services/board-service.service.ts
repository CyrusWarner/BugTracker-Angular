import { UserService } from './user-service.service';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NewBoard } from './../models/board-models';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable()

export class BoardService {
  constructor(
    private httpClient: HttpClient,
    private userService: UserService
    ) {}

  addNewBoard(newBoard: NewBoard, userToken: string) {
    const url = 'http://localhost:4200/api/board'
    const reqHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': userToken // TODO Remove the exclamation point and add a condition for if there is no token
    })
    return this.httpClient.post<NewBoard>(url, newBoard, {observe: 'response', headers: reqHeaders})
      .pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error)

  }
}
