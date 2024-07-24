import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Vendeur } from 'src/Modeles/Vendeur';
import { SearchServiceService } from 'src/Service/search-service.service';
import { VendeursServiceService } from 'src/Service/vendeurs-service.service';
import { ModalComponent } from 'src/app/modal/modal.component';

@Component({
  selector: 'app-vendeurs',
  templateUrl: './vendeurs.component.html',
  styleUrls: ['./vendeurs.component.css']
})
export class VendeursComponent implements OnInit {
  currentDate: Date = new Date();
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weeks: number[][] = [];
  vendeurs: Vendeur[] = [];
  tabinvendeur: Vendeur[] = [];
  searchText: string = '';

  datasource = new MatTableDataSource<Vendeur>();

  constructor(
    private vendeurService: VendeursServiceService,
    private dialog: MatDialog,
    private router: Router,
    private searchService: SearchServiceService
  ) {}

  ngOnInit(): void {
    this.generateCalendar();
    this.getAllVendeurs();
  }

  getAllVendeurs(): void {
    this.vendeurService.getAllVendeurs().subscribe((data: Vendeur[]) => {
      this.vendeurs = data;
      this.tabinvendeur = data; // Store all invitations
      this.datasource = new MatTableDataSource<Vendeur>(this.vendeurs);
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

  search(searchText: string): void {
    if (searchText.trim() !== '') {
      this.vendeurs = this.tabinvendeur.filter(vendeur =>
        vendeur.title.toLowerCase().includes(searchText.toLowerCase())
      );
    } else {
      this.vendeurs = this.tabinvendeur; // Reset invitations if search field is empty
    }
    this.datasource = new MatTableDataSource<Vendeur>(this.vendeurs);
  }

  onSearch(): void {
    this.searchService.setSearchText(this.searchText);
  }

  clearSearch(): void {
    this.searchText = '';
    this.searchService.setSearchText(this.searchText);
  }

  onedit(id: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.vendeurService.getVendeurbyId(id).subscribe((r) => {
      dialogConfig.data = r;
      this.dialog.open(ModalComponent, dialogConfig);
    });
  }

  open(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(ModalComponent, dialogConfig);
  }
}
