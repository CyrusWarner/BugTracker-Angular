import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserForm!: FormGroup
  email?: FormControl
  password?: FormControl

  constructor() { }

  ngOnInit(): void {

    this.buildLoginUserForm()
  }

  loginUser(loginForm: FormGroup) {

  }

  buildLoginUserForm() {
    this.email = new FormControl('', Validators.required)
    this.password = new FormControl('', Validators.required)

    this.loginUserForm = new FormGroup({
      email: this.email,
      password: this.password
    })
  }

  canSubmitLoginForm(loginUserForm: FormGroup) {
    return loginUserForm.invalid
  }

}
