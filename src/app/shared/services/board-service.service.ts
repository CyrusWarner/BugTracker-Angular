import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NewBoard, UserBoard } from './../models/board-models';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable()

export class BoardService {
  constructor(
    private httpClient: HttpClient,
    ) {}

  addNewBoard(newBoard: NewBoard) {
    const url = 'http://localhost:4200/api/board'
    return this.httpClient.post<NewBoard>(url, newBoard, {observe: 'response'})
      .pipe(catchError(this.handleError))
  }

  getInvitedBoards(userId: number) {
    const url = `http://localhost:4001/api/board/invited-boards/user/${userId}`
    return this.httpClient.get<UserBoard>(url)
      .pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error)

  }
}
