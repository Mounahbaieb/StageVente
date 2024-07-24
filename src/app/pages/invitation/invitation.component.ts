import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Invitation } from 'src/Modeles/Invitation';
import { InvitationService } from 'src/Service/invitation.service';
import { VendeursServiceService } from 'src/Service/vendeurs-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
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
  tabinvitation: Invitation[] = [];
  datasource = new MatTableDataSource<Invitation>();

  constructor(private invitationService: InvitationService,
              private router: Router,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private vendeurService : VendeursServiceService,
              private snackBar: MatSnackBar,
              private cdr: ChangeDetectorRef ,// Inject ChangeDetectorRef ici


  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.invitationId = params['id'];
      this.invitationService.getInvitations().subscribe((data: Invitation[]) => {
        this.invitations = data;
        this.tabinvitation = data; // Store all invitations
        this.datasource = new MatTableDataSource<Invitation>(this.invitations);
        this.cdr.detectChanges(); // Forcer la détection des changements
    });
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
  deleteInvitation(id: string): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });
  
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.invitationService.ONDELETE(id).subscribe(() => {
          this.snackBar.open('Invitation supprimée avec succès', 'Fermer', { duration: 3000 });
          this.getAllInvitations();
          this.router.navigateByUrl('/detailInvitation').then(()=>{
            location.reload()
          })
           // Mettre à jour la liste des invitations après la suppression
        }, error => {
          console.error('Erreur lors de la suppression de l\'invitation : ', error);
          this.snackBar.open('Erreur lors de la suppression de l\'invitation', 'Fermer', { duration: 3000 });
        });
      }
    });
  }
  
  getAllInvitations(): void {
    this.invitationService.getInvitations().subscribe((data: Invitation[]) => {
      this.invitations = data;
      this.tabinvitation = data; // Conserver toutes les invitations dans `tabinvitation`
      this.datasource.data = [...this.invitations]; // Mettre à jour la source de données
    }, error => {
      console.error('Erreur lors de la récupération des invitations : ', error);
      this.snackBar.open('Erreur lors de la récupération des invitations', 'Fermer', { duration: 3000 });
    });
  }
  
  accepterVendeur(invitation: Invitation): void {
    const vendeur = {
        title: invitation.title,
        adresse: invitation.adresse,
        telephone: invitation.telephone,
        email: invitation.email
    };

    console.log('Tentative d\'ajout du vendeur :', vendeur);

    this.invitationService.ajouterVendeur(vendeur).subscribe(
        () => {
            this.snackBar.open('Vendeur ajouté avec succès', 'Fermer', { duration: 3000 });

            // Supprimer l'invitation de la liste après l'ajout du vendeur
            this.invitationService.ONDELETE(invitation.id).subscribe(() => {
            this.getAllInvitations(); // Mettre à jour la liste des invitations après la suppression
                    this.router.navigateByUrl('/detailInvitation').then(()=>{
                      location.reload()
                    })
                  }); 
        },
        error => {
            console.error('Erreur lors de l\'ajout du vendeur : ', error);
            this.snackBar.open('Erreur lors de l\'ajout du vendeur', 'Fermer', { duration: 3000 });
        }
    );
}


  
}


