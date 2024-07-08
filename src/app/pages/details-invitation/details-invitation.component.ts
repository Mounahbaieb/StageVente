import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Invitation } from 'src/Modeles/Invitation';
import { InvitationService } from 'src/Service/invitation.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { SearchServiceService } from 'src/Service/search-service.service';

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
    private searchService: SearchServiceService

  ) {}

  ngOnInit(): void {
    this.getAllInvitations();

    this.generateCalendar();
    this.invitationService.getInvitations().subscribe((data: Invitation[]) => {
      this.invitations = data;
      this.tabinvitation = data; // Store all invitations
      this.datasource = new MatTableDataSource<Invitation>(this.invitations);

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

  deleteInvitation(id: string): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.invitationService.ONDELETE(id).subscribe(() => {
          this.getAllInvitations();
        });
      }
    });
  }

  getAllInvitations(): void {
    this.invitationService.getInvitations().subscribe((data: Invitation[]) => {
      this.invitations = data;
      this.tabinvitation = data; // Store all invitations
      this.datasource = new MatTableDataSource<Invitation>(this.invitations);
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
