import { HttpResponse } from '@angular/common/http';
import { RegisteredUser } from './../../shared/models/user-models';
import { UserService } from './../../shared/services/user-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from 'src/app/validators/password-validator.directive';
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
  resStatusCode?: number

  constructor(private userService: UserService) { }

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
        if(res){
          this.resStatusCode = res.status
        }
      }, (err) => {
        this.resStatusCode = err.status
        this.errorMessage =  this.userService.filterRegistrationErrors(err.error.message) // finds the registration error
      })

    }

  }

  // canSubmitRegisterForm checks if the form is invalid and returns the value
  canSubmitRegisterForm(registerForm: FormGroup): boolean {
    return registerForm.invalid
  }

}
