import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { RegisteredUser, User, UserLogin, UserToken } from './../models/user-models';
import { LocalStorageService } from './local-storage-service.service';
import { UserService } from './user-service.service';
import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'

describe('UserService', () => {
  let service: UserService
  let localStorageServiceSpy: any
  let routerSpy: any
  let httpTestingController: HttpTestingController
  beforeEach(() => {
    localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', ['storeItemInLocalStorage', 'clearLocalStorage', 'getItemInLocalStorage'])
    routerSpy = jasmine.createSpyObj('Router', ['navigate'])
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        UserService,
        {provide: LocalStorageService, useValue: localStorageServiceSpy},
        {provide: Router, useValue: routerSpy}
      ]
    })
    httpTestingController = TestBed.inject(HttpTestingController)
    service = TestBed.inject(UserService)
  })

  describe('registerUser', () => {
    it('should make the http request with the correct url', (done: DoneFn) => {
      const expectedUser: RegisteredUser = {
        userId: 1,
        firstName: 'test',
        lastName: 'value',
        email: 'testvalue@gmail.com',
        dateJoined: '1/3/2022'
      }
      let testForm = new FormGroup(
        {
          firstName: new FormControl('test'),
          lastName: new FormControl('user'),
          email: new FormControl('testuser@gmail.com'),
          password: new FormControl('pass'),
          confirmPassword: new FormControl('pass'),
        }
      )

      service.registerUser(testForm).subscribe((res) => {
        expect(res.body).toEqual(expectedUser)
        done()
      }, done.fail
      )

      const req = httpTestingController.expectOne(
        "http://localhost:4200/api/user/register"
      );
      req.flush(expectedUser)
      httpTestingController.verify()
    })
  })

  describe('loginUser', () => {
    it('should make the http request with the correct url', () => {
      const expectedUrl ="http://localhost:4200/api/user/login"
      const user: UserLogin = {
        email: 'testuser@gmail.com',
        password: 'testpass',
      }
      const expectedResponse:UserToken = {
        token: 'wasd',
        expiration: 1110607
      }
      const expectedDecodedUser: User = {
        userId: 1,
        firstName: 'test',
        lastName: 'user',
        email: user.email,
        emailConfirmed: true,
        dateJoined: '01-04-2022'

      }
      spyOn(service, 'decodeUserToken').and.returnValue(expectedDecodedUser)

      service.loginUser(user)

      const req = httpTestingController.expectOne(expectedUrl)
      req.flush(expectedResponse)
      expect(service.currentUser).toEqual(expectedDecodedUser)
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/home'])
    })
  })

  describe('logout', () => {
    it('should call the localStorageService method clearLocalStorage', () => {
      service.logout()

      expect(localStorageServiceSpy.clearLocalStorage).toHaveBeenCalled()
    })
  })
  describe('getUserFromLocalStorage', () => {
    it('shoud navigate to the LoginComponent if no userToken can be found from the localStorageService', () => {
      localStorageServiceSpy.getItemInLocalStorage.and.returnValue(null)

      service.getUserFromLocalStorage()

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login'])
    })
    it('should nvaigate to the HomeComponent if a userToken is returned from the localStorageService', () => {
      const userToken: UserToken = {
        token: 'wasd',
        expiration: 10002399
      }
      const expectedDecodedUser: User = {
        userId: 1,
        firstName: 'test',
        lastName: 'user',
        email: 'testuser@gmail.com',
        emailConfirmed: true,
        dateJoined: '01-04-2022'

      }
      localStorageServiceSpy.getItemInLocalStorage.and.returnValue(userToken)
      spyOn(service, 'decodeUserToken').and.returnValue(expectedDecodedUser)

      service.getUserFromLocalStorage()

      expect(service.currentUser).toEqual(expectedDecodedUser)
      expect(service.userToken).toEqual(userToken)
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/home'])
    })
  })
  describe('filterLoginErrors', () => {
    it('should return "Invalid Email Or Password" if the errMessage is INVALID_LOGIN', () => {
      const errMessage: string = 'INVALID_LOGIN'

      let res = service.filterLoginErrors(errMessage)

      expect(res).toEqual('Invalid Email Or Password')
    })
    it('should return "Please Enter Information Into All Fields" if the errMessage is INVALID_USER_LOGIN_OBJECT', () => {
      const errMessage: string = 'INVALID_USER_LOGIN_OBJECT'

      let res = service.filterLoginErrors(errMessage)

      expect(res).toEqual('Please Enter Information Into All Fields')
    })
    it('should return "Error Logging In. Please Try Again Later" if the errMessage does not match any case', () => {
      const errMessage: string = 'Internal Server Error'

      let res = service.filterLoginErrors(errMessage)

      expect(res).toEqual('Error Logging In. Please Try Again Later')
    })
  })

})
