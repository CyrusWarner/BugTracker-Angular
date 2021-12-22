import { UserService } from './../../shared/services/user-service.service';
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

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.buildLoginUserForm()
  }

  loginUser(loginForm: FormGroup) {
    if(loginForm.valid){
      this.userService.loginUser(loginForm.value)
    }
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
