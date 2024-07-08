import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServicesService } from 'src/Service/auth-services.service';
import { SearchServiceService } from 'src/Service/search-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthServicesService, private router: Router, private searchService: SearchServiceService) {}
  searchText: string = '';


  onSearch() {
    this.searchService.setSearchText(this.searchText);
  }

  clearSearch() {
    this.searchText = '';
    this.searchService.setSearchText(this.searchText);
  }
  isLoggedIn(): boolean {
    return this.authService.checkAuth(); // Vérifie l'état d'authentification
  }

  logout(): void {
    // Ajoutez ici votre logique de déconnexion (par exemple, nettoyage de tokens, etc.)
    // Redirection vers la page de login
    this.authService.logout(); // Exemple: appeler votre service de déconnexion
    this.router.navigateByUrl('/login');
  }
}
