import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invitation } from 'src/Modeles/Invitation';
import { Vendeur } from 'src/Modeles/Vendeur';

@Injectable({
  providedIn: 'root'
})
export class VendeursServiceService {
 

  private url = 'http://localhost:3000/vendeurs'; // Assurez-vous que cette URL correspond à votre backend

  constructor(private http: HttpClient) { }

  ajouterVendeur(vendeur: Vendeur): Observable<Vendeur> {
    return this.http.post<Vendeur>(this.url, vendeur);
  }
}