import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Livreur } from 'src/Modeles/livreur';
import { LivreurService } from 'src/Service/livreur.service';
import { SearchServiceService } from 'src/Service/search-service.service';
import { MondalLivreurComponent } from 'src/app/mondal-livreur/mondal-livreur.component';

@Component({
  selector: 'app-livreurs',
  templateUrl: './livreurs.component.html',
  styleUrls: ['./livreurs.component.css']
})
export class LivreursComponent implements OnInit {
  currentDate: Date = new Date();
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weeks: number[][] = [];
  chart: any;
  tabLivreur: Livreur[] = [];
  datasource = new MatTableDataSource<Livreur>();
  livreurs: Livreur[] = [];
  searchText: string = '';

  constructor(
    private LivreurService: LivreurService,
    private dialog: MatDialog,
    private searchService: SearchServiceService
  ) {}

  ngOnInit(): void {
    this.generateCalendar();
    this.getAllLivreurs();
  }

  onedit(id: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.LivreurService.getLivreurbyId(id).subscribe((r) => {
      dialogConfig.data = r;
      this.dialog.open(MondalLivreurComponent, dialogConfig);
    });
  }

  open(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(MondalLivreurComponent, dialogConfig);
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
  getAllLivreurs(): void {
    this.LivreurService.getAllLivreurs().subscribe((data: Livreur[]) => {
      this.livreurs = data;
      this.tabLivreur = data; // Store all invitations
      this.datasource = new MatTableDataSource<Livreur>(this.livreurs);
    });
    this.searchService.searchText$.subscribe((searchText: string) => {
      this.search(searchText);
    });
  }
  search(searchText: string): void {
    if (searchText.trim() !== '') {
      this.livreurs = this.tabLivreur.filter(invitation =>
        invitation.NomPrenom.toLowerCase().includes(searchText.toLowerCase())
      );
    } else {
      this.livreurs = this.tabLivreur; // Réinitialiser les invitations si le champ de recherche est vide
    }
    this.datasource = new MatTableDataSource<Livreur>(this.livreurs);
  }
  onSearch(): void {
    this.searchService.setSearchText(this.searchText);
  }

  clearSearch(): void {
    this.searchText = '';
    this.searchService.setSearchText(this.searchText);
  }
}
