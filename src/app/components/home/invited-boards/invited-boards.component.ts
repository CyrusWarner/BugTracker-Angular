import { BoardService } from './../../../shared/services/board-service.service';
import { UserService } from './../../../shared/services/user-service.service';
import { Component, OnInit } from '@angular/core';
import { UserBoard } from 'src/app/shared/models/board-models';

@Component({
  selector: 'app-invited-boards',
  templateUrl: './invited-boards.component.html',
  styleUrls: ['./invited-boards.component.css']
})
export class InvitedBoardsComponent implements OnInit {
  invitedBoards: UserBoard[] = []

  constructor(
    private userService: UserService,
    private boardService: BoardService
    ) { }

  ngOnInit(): void {
    if(this.userService.currentUser){
      this.getInvitedBoards(this.userService.currentUser?.userId)
    }
  }

  getInvitedBoards(userId: number) {
    this.boardService.getInvitedBoards(userId).subscribe((res) => {
      if(res) {
        this.invitedBoards = res
      }
    }, (err) => {
      console.log(err);

    })

  }

}
