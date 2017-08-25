import { Component, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { KEY_CODE, PASS_REGEX } from '../../shared/enums';

declare var alertify: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  public LoginForm: FormGroup;

  constructor(
      private loginService: LoginService
  ) {
    this.LoginForm = new FormGroup({
      'login': new FormControl('', Validators.required),
      'password': new FormControl('', [Validators.required, Validators.pattern(PASS_REGEX)]),
      'remember': new FormControl(false)
    });
  }
  @HostListener('window:keyup', ['$event'])
  public keyEvent($event) {
    if($event.keyCode === KEY_CODE.ENTER) {
      this.submit(this.LoginForm);
    }
  }

  public submit (form: FormGroup) {
    if (form.invalid) {
      alertify.error('Please fill the form');
      return;
    }
    this.loginService.logIn(form.value);
  }

}
