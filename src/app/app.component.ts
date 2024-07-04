import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServicesService } from '../Service/auth-services.service'; // Assurez-vous d'importer correctement le service

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthServicesService, private router: Router) {}

  isLoggedIn(): boolean {
    return this.authService.checkAuth(); // Vérifie l'état d'authentification
  }

  isLoginPage(): boolean {
    return this.router.url === '/login'; // Vérifie si l'utilisateur est sur la page de connexion
  }

  logout(): void {
    this.authService.logout(); // Appelle la méthode logout du service d'authentification
    this.router.navigate(['/login']); // Redirection vers la page de connexion après déconnexion
  }
}
