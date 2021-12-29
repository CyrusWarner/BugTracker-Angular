import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitedBoardsComponent } from './invited-boards.component';

describe('InvitedBoardsComponent', () => {
  let component: InvitedBoardsComponent;
  let fixture: ComponentFixture<InvitedBoardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitedBoardsComponent ]
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
});
