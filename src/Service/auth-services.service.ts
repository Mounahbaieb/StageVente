import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  private isAuthenticated = false;

  constructor(private router: Router) {}

  login() {
    this.isAuthenticated = true;
    // Redirection vers une autre page après connexion réussie si nécessaire
  }

  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['/login']); // Redirection vers la page de connexion après déconnexion
  }

  checkAuth(): boolean {
    return this.isAuthenticated;
  }
}
