import { BoardService } from './../../../shared/services/board-service.service';
import { UserService } from './../../../shared/services/user-service.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitedBoardsComponent } from './invited-boards.component';
import { of } from 'rxjs';
import { UserBoard } from 'src/app/shared/models/board-models';

describe('InvitedBoardsComponent', () => {
  let component: InvitedBoardsComponent;
  let fixture: ComponentFixture<InvitedBoardsComponent>;
  const userServiceSpy = jasmine.createSpyObj('UserService', [''])
  const boardServiceSpy = jasmine.createSpyObj('BoardService', ['getInvitedBoards'])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitedBoardsComponent ],
      providers: [
        {provide: UserService, useValue: userServiceSpy},
        {provide: BoardService, useValue: boardServiceSpy}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitedBoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getInvitedBoards', () => {
    it('should get a users invited boards', () => {
      const userId = 17
      const expectedInvitedBoards: UserBoard[] = [
        {
          boardId: 1,
          rolesId: 2,
          userId: 17,
          inviteAccepted: false,
          board: {
            boardId: 1,
            title: 'Amazon',
            description: 'This is a test board'
          }
        }
      ]
      boardServiceSpy.getInvitedBoards.and.returnValue(of(expectedInvitedBoards))

      component.getInvitedBoards(userId)

      expect(component.invitedBoards).toEqual(expectedInvitedBoards)
    })
  })
});
