import { UserToken } from './../../../shared/models/user-models';
import { BoardService } from './../../../shared/services/board-service.service';
import { UserService } from './../../../shared/services/user-service.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardFormComponent } from './board-form.component';
import { NewBoard } from 'src/app/shared/models/board-models';
import { of } from 'rxjs';

describe('BoardFormComponent', () => {
  let component: BoardFormComponent;
  let fixture: ComponentFixture<BoardFormComponent>;
  let userServiceSpy:any;
  let boardServiceSpy:any;


  beforeEach(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', [''], ['userToken'])
    boardServiceSpy = jasmine.createSpyObj('BoardService', ['addNewBoard'])

    TestBed.configureTestingModule({
      declarations: [ BoardFormComponent ],
      providers: [
        {provide: UserService, useValue: userServiceSpy},
        {provide: BoardService, useValue: boardServiceSpy}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('addNewBoard', () => {
    it('should not call the boardService addNewBoard method if their is no userToken provided', () => {
      const testBoard: NewBoard = { // Arrange
        title: "This is a test",
        description: "This is a test decription"
      }
      let testToken: UserToken = {token: "", expiration: 1}

      boardServiceSpy.addNewBoard.and.returnValue(of(false)) // Act
      component.addNewBoard(testBoard, testToken)

      expect(boardServiceSpy.addNewBoard).not.toHaveBeenCalled() // Assert
    })
  })
  describe('addNewBoard', () => {
    it('should call the boardService addNewBoard method if their is a userToken provided', () => {
      const testBoard: NewBoard = { // Arrange
        title: "This is a test",
        description: "This is a test decription"
      }
      let testToken: UserToken = {token: "wasd", expiration: 1}

      boardServiceSpy.addNewBoard.and.returnValue(of(false)) // Act
      component.addNewBoard(testBoard, testToken)

      expect(boardServiceSpy.addNewBoard).toHaveBeenCalled() // Assert


    })
  })
});
