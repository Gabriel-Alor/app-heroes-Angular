import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .container {
      margin: 12px;
    }
  `]
})
export class HomeComponent {

  public get auth(): Auth {
    return this.authService.auth;
  }

  constructor( private router: Router, private authService: AuthService ) {}

  public logout() {
    this.authService.logout();
    this.router.navigate(['./auth']);
  }
}
