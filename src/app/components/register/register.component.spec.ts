import { observable, of, throwError } from 'rxjs';
import { UserService } from './../../shared/services/user-service.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userServiceSpy:any;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['registerUser', 'filterRegistrationErrors'])

    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      providers: [
        {provide: UserService, useValue: userServiceSpy}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('registerUser', () => {
    it('should not call the user service if the register user form is invalid', () => {
      component.registerUser(component.registerUserForm)

      expect(userServiceSpy.registerUser).not.toHaveBeenCalled()
    })
    it('should call the user service method registerUser if the register user form is valid', () => {
      userServiceSpy.registerUser.and.returnValue(of(true))

      component.firstName?.setValue("Cyrus")
      component.lastName?.setValue("Warner")
      component.email?.setValue("testemail@gmail.com")
      component.password?.setValue("testpass")
      component.confirmPassword?.setValue("testpass")
      component.registerUser(component.registerUserForm)

      expect(userServiceSpy.registerUser).toHaveBeenCalled()
    })
    it('should return an observable with a status code 201 if registration is successful', () => {
      const res = {
        status: 201
      }
      userServiceSpy.registerUser.and.returnValue(of(res))

      component.firstName?.setValue("Cyrus")
      component.lastName?.setValue("Warner")
      component.email?.setValue("testemail@gmail.com")
      component.password?.setValue("testpass")
      component.confirmPassword?.setValue("testpass")
      component.registerUser(component.registerUserForm)

      expect(userServiceSpy.registerUser).toHaveBeenCalled()
      expect(component.resStatusCode).toEqual(res.status)
    })
    // TODO MOVE ERROR MESSAGES TO CONSTANTS FOLDER
    it('should return an error observable with a status code and error message if an error is returned from the http response', () => {
      const err = {
        error: {
          message: "INVALID_REGISTER_USER_REQUEST"
        },
        status: 400
      }
      userServiceSpy.registerUser.and.returnValue(throwError(err))
      userServiceSpy.filterRegistrationErrors.and.returnValue("Please Enter Information Into All Fields")
      component.firstName?.setValue("Cyrus")
      component.lastName?.setValue("Warner")
      component.email?.setValue("testemail@gmail.com")
      component.password?.setValue("testpass")
      component.confirmPassword?.setValue("testpass")
      component.registerUser(component.registerUserForm)

      expect(userServiceSpy.registerUser).toHaveBeenCalled()
      expect(component.resStatusCode).toEqual(err.status)
      expect(component.errorMessage).toBe("Please Enter Information Into All Fields")
    })
  })
});
