import { UserService } from './../../shared/services/user-service.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceSpy:any
  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['loginUser'])
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        {provide: UserService, useValue: userServiceSpy}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('loginUser', () => {
    it('should call the UserService loginUser function', () => {
      const testLogin = {
        email: "Testemail@gmail.com",
        password: "FakePass"
      }

      component.loginUserForm.setValue(testLogin)
      component.loginUser(component.loginUserForm)

      expect(userServiceSpy.loginUser).toHaveBeenCalled()
    })
    it('should not call the UserService loginUser function', () => {
      const testEmail = "Testemail@gmail.com" // Arrange

      component.loginUserForm.get('email')?.setValue(testEmail) // Act
      component.loginUser(component.loginUserForm)

      expect(userServiceSpy.loginUser).not.toHaveBeenCalled() // Assert
    })
  })
});
