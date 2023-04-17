import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor( private router: Router, private authService: AuthService ){}

  public login() {
  
    this.authService.login()
        .subscribe({
          next: (resp) => {
            if(resp.id) {
              this.router.navigate(['/heroes']);
            }
          },
          error: (err) => {
            console.warn(err);
          }
        })

  }

  public sinlogin() {
    this.router.navigate(['./heroes']);
  }
}
