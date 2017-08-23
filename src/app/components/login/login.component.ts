import { Component, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { EMAIL_REGEX, KEY_CODE } from '../../shared/enums';

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
      'email': new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]),
      'password': new FormControl('', Validators.required),
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
    this.loginService.logIn(form.value);
  }

}
