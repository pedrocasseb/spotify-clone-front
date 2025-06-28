import { Component, inject } from '@angular/core';
import { Auth } from '../../service/auth';

@Component({
  selector: 'app-auth-popup',
  imports: [],
  templateUrl: './auth-popup.html',
  styleUrl: './auth-popup.scss'
})
export class AuthPopup {

  private authService = inject(Auth);

  login(): void {
    this.authService.login();
  }

}
