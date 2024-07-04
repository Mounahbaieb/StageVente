import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServicesService } from 'src/Service/auth-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthServicesService, private router: Router) {}

  signin(): void {
    // Appel à une méthode de service d'authentification
    this.authService.login();
    this.router.navigate(['/dashboard']);

  }
}
