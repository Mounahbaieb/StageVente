import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livreur } from 'src/Modeles/livreur';

@Injectable({
  providedIn: 'root'
})
export class LivreurService {
  private url = 'http://localhost:3000/Livreurs ';

  constructor(private httpClient: HttpClient) { }
 
  getAllLivreurs(): Observable<Livreur[]> {
    return this.httpClient.get<Livreur[]>(this.url);
  }
  save(form: any): Observable<any> {
    return this.httpClient.post<any>('http://localhost:3000/Livreurs', form);
  }
  getLivreurbyId(id: String): Observable<Livreur> {
    return this.httpClient.get<Livreur>(`http://localhost:3000/Livreurs/${id}`);
  }
  edit(form: any, id: string): Observable<any> {
    return this.httpClient.put<any>(
      `http://localhost:3000/Livreurs/${id}`,form);
  }
}
