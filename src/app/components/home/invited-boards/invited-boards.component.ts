import { BoardService } from './../../../shared/services/board-service.service';
import { User } from './../../../shared/models/user-models';
import { UserService } from './../../../shared/services/user-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invited-boards',
  templateUrl: './invited-boards.component.html',
  styleUrls: ['./invited-boards.component.css']
})
export class InvitedBoardsComponent implements OnInit {

  constructor(
    private userService: UserService,
    private boardService: BoardService
    ) { }

  ngOnInit(): void {
    console.log(this.userService.currentUser);

    if(this.userService.currentUser){
      this.getInvitedBoards(this.userService.currentUser?.userId)
    }
  }

  getInvitedBoards(userId: number) {
    this.boardService.getInvitedBoards(userId).subscribe((res) => {
      if(res) {
        console.log(res);

      }
    }, (err) => {
      console.log(err);

    })

  }

}
