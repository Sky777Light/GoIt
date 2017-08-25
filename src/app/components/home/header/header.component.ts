import { Component } from '@angular/core';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})

export class HeaderComponent {

  constructor(
      private loginService: LoginService
  ) {}

}
