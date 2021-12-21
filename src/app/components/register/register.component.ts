import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor() { }

  ngOnInit(): void {
    this.buildRegisterUserForm()

  }

  buildRegisterUserForm(){
    // Builds the register form
    this.firstName = new FormControl('', [Validators.required, Validators.minLength(3)])
    this.lastName = new FormControl('', [Validators.required, Validators.minLength(3)])
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
      }
    )
  }

  registerUser(registerForm: FormGroup) {

  }

}
