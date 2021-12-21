import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { UserRegister, RegisteredUser } from './../../shared/models/user-models';
import { UserService } from './../../shared/services/user-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from 'src/app/validators/password-validator.directive';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserForm!: FormGroup // the exclamation point is needed for it to ignore that it is not initialized
  firstName?: FormControl
  lastName?: FormControl;
  email?: FormControl;
  password?: FormControl;
  confirmPassword?: FormControl
  errorMessage?: string

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.buildRegisterUserForm()

  }

  buildRegisterUserForm(): void{
    // Builds the register form
    this.firstName = new FormControl('', [Validators.required])
    this.lastName = new FormControl('', [Validators.required])
    this.email = new FormControl('', [Validators.required])
    this.password = new FormControl('', [Validators.required])
    this.confirmPassword = new FormControl('', Validators.required)

    this.registerUserForm = new FormGroup(
      {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      }, {validators: passwordValidator}
    )
  }

  // registerUser calls the user service and registers the user and then navigates to the login page if registration was successfull
  registerUser(registerForm: FormGroup): void {
    if (registerForm.valid){
      this.userService.registerUser(registerForm).subscribe((res: HttpResponse<RegisteredUser> ) => {
        if(res.status === 201){
          this.router.navigate(['/login'])
        }
      }, (error) => {
        this.errorMessage =  this.userService.filterRegistrationErrors(error.message) // finds the registration error
      })

    }

  }

  // canSubmitRegisterForm checks if the form is invalid and returns the value
  canSubmitRegisterForm(registerForm: FormGroup): boolean {
    return registerForm.invalid
  }

}
