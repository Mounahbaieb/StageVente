import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Invitation } from 'src/Modeles/Invitation';
import { InvitationService } from 'src/Service/invitation.service';
import { VendeursServiceService } from 'src/Service/vendeurs-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit {

  invitations: Invitation[] = [];
  currentDate: Date = new Date();
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weeks: number[][] = [];
  invitation$: Observable<Invitation> | undefined; // Utilisation correcte de l'observable
  invitationId: string | null = null;

  constructor(private invitationService: InvitationService,
              private router: Router,
              private route: ActivatedRoute,
              private vendeurService : VendeursServiceService,
              private snackBar: MatSnackBar // Assurez-vous que MatSnackBar est injecté ici

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.invitationId = params['id'];
      if (this.invitationId) {
        this.getInvitationDetails(this.invitationId);
      }
    });
  }

  getInvitationDetails(invitationId: string): void {
    this.invitation$ = this.invitationService.getInvitationById(invitationId);
  }

  selectDate(day: number): void {
    if (day !== 0) {
      console.log('Selected Date:', day);
    }
  }
  accepterVendeur(invitation: Invitation): void {
    const vendeur = {
      title: invitation.title,
      adresse: invitation.adresse,
      telephone: invitation.telephone,
      email: invitation.email
    };
  
    this.invitationService.ajouterVendeur(vendeur).subscribe(
      () => {
        this.snackBar.open('Vendeur ajouté avec succès', 'Fermer', { duration: 3000 });
      },
      error => {
        console.error('Erreur lors de l\'ajout du vendeur : ', error);
        this.snackBar.open('Erreur lors de l\'ajout du vendeur', 'Fermer', { duration: 3000 });
      }
    );
  }
  
}


