import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-livreurs',
  templateUrl: './livreurs.component.html',
  styleUrls: ['./livreurs.component.css']
})
export class LivreursComponent implements OnInit {
  currentDate: Date = new Date();
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weeks: number[][] = [];
  chart: any

  constructor() { }

  ngOnInit(): void {
    this.generateCalendar();
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
}
