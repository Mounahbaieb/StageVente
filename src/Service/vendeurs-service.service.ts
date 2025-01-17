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
  getAllVendeurs(): Observable<Vendeur[]> {
    return this.http.get<Vendeur[]>(this.url);
  }
  getVendeurbyId(id: String): Observable<Vendeur> {
    return this.http.get<Vendeur>(`http://localhost:3000/vendeurs/${id}`);
  }
  edit(form: any, id: string): Observable<any> {
    return this.http.put<any>(
      `http://localhost:3000/vendeurs/${id}`,form);
  }
  confirm(form: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/vendeurs', form);
  }
}