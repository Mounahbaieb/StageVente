import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Invitation } from 'src/Modeles/Invitation';
import { InvitationService } from 'src/Service/invitation.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { SearchServiceService } from 'src/Service/search-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VendeursServiceService } from 'src/Service/vendeurs-service.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-details-invitation',
  templateUrl: './details-invitation.component.html',
  styleUrls: ['./details-invitation.component.css']
})
export class DetailsInvitationComponent implements OnInit {
  currentDate: Date = new Date();
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weeks: number[][] = [];
  invitations: Invitation[] = [];
  tabinvitation: Invitation[] = [];
  searchText: string = '';

  datasource = new MatTableDataSource<Invitation>();

  constructor(
    private invitationService: InvitationService,
    private router: Router,
    private dialog: MatDialog,
    private searchService: SearchServiceService,
    private vendeurService : VendeursServiceService,
    private cdr: ChangeDetectorRef ,// Inject ChangeDetectorRef ici

    private snackBar: MatSnackBar // Assurez-vous que MatSnackBar est injecté ici


  ) {}

  ngOnInit(): void {
    this.getAllInvitations();

    this.generateCalendar();
    this.invitationService.getInvitations().subscribe((data: Invitation[]) => {
        this.invitations = data;
        this.tabinvitation = data; // Store all invitations
        this.datasource = new MatTableDataSource<Invitation>(this.invitations);
        this.cdr.detectChanges(); // Forcer la détection des changements
    });
    this.searchService.searchText$.subscribe((searchText: string) => {
        this.search(searchText);
    });
}


  generateCalendar(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    let day = 1;
    let week: number[] = [];
    for (let i = 0; i < 42; i++) {
      if (i >= firstDayOfMonth && day <= daysInMonth) {
        week.push(day);
        day++;
      } else {
        week.push(0);
      }
      if (i % 7 === 6) {
        this.weeks.push(week);
        week = [];
      }
    }
  }

  selectDate(day: number): void {
    if (day !== 0) {
      console.log('Selected Date:', day);
    }
  }

  goToInvitationDetail(invitationId: string): void {
    this.router.navigate(['/ride-detail', invitationId]);
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
            const index = this.invitations.indexOf(invitation);
            if (index !== -1) {
                console.log('Invitation trouvée, suppression...');
                  this.invitationService.ONDELETE(invitation.id).subscribe(() => {
                    console.log('Invitation supprimée.');
                    this.getAllInvitations(); // Mettre à jour la liste des invitations après la suppression
                    this.router.navigateByUrl('/detailInvitation').then(()=>{
                      location.reload()
                    })
                  });                // Forcer la détection des changements
            } else {
                console.log('Invitation non trouvée dans la liste.');
            }
        },
        error => {
            console.error('Erreur lors de l\'ajout du vendeur : ', error);
            this.snackBar.open('Erreur lors de l\'ajout du vendeur', 'Fermer', { duration: 3000 });
        }
    );
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
          this.getAllInvitations(); // Mettre à jour la liste des invitations après la suppression
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
  

  

  search(searchText: string): void {
    if (searchText.trim() !== '') {
      this.invitations = this.tabinvitation.filter(invitation =>
        invitation.title.toLowerCase().includes(searchText.toLowerCase())
      );
    } else {
      this.invitations = this.tabinvitation; // Réinitialiser les invitations si le champ de recherche est vide
    }
    this.datasource = new MatTableDataSource<Invitation>(this.invitations);
  }

  
  
  
}
