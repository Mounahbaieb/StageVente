import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invitation } from 'src/Modeles/Invitation';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  private url = 'http://localhost:3000/invitations';

  constructor(private httpClient: HttpClient) {}

  getInvitations(): Observable<Invitation[]> {
    return this.httpClient.get<Invitation[]>(this.url);
  }

  getInvitationById(invitationId: string): Observable<Invitation> {
    return this.httpClient.get<Invitation>(`http://localhost:3000/invitations/${invitationId}`);
  }
  ONDELETE(invitationId: string): Observable<any> {
     return this.httpClient.delete(`http://localhost:3000/invitations/${invitationId}`);
}

ajouterVendeur(vendeur: any): Observable<any> {
  return this.httpClient.post<any>(`http://localhost:3000/vendeurs/`,vendeur);
}


  GETALL(): Observable<Invitation[]> {
    return this.httpClient.get<Invitation[]>(this.url);
  }
 
}
