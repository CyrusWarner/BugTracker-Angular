import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { RegisteredUser, UserLogin, UserToken } from './../models/user-models';
import { LocalStorageService } from './local-storage-service.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user-service.service';
import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'

describe('UserService', () => {
  let service: UserService
  let localStorageServiceSpy: any
  let routerSpy: any
  let httpTestingController: HttpTestingController
  beforeEach(() => {
    localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', ['storeItemInLocalStorage'])
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
      spyOn(service, 'decodeUserToken')

      service.loginUser(user)

      const req = httpTestingController.expectOne(expectedUrl)
      req.flush(expectedResponse)
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/home'])
    })
  })

})
