import { Component } from '@angular/core';

@Component({
  selector: 'app-details-invitation',
  templateUrl: './details-invitation.component.html',
  styleUrls: ['./details-invitation.component.css']
})
export class DetailsInvitationComponent {
  currentDate: Date = new Date();
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weeks: number[][] = [];
  chart: any
  
    selectDate(day: number): void {
      if (day !== 0) {
        console.log('Selected Date:', day);
      }
}
}
