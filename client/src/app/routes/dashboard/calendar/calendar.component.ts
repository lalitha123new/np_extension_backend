import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  SelectedDate: any;
  // calendarApi : any;
  EventList: any[] = [{ title: 'holiday', date: '2021-06-27' }];
  calendarOptions: CalendarOptions = {};

  constructor(private datepipe: DatePipe) {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      dateClick: this.onDateClick.bind(this),
      events: this.EventList,
    };
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        dateClick: this.onDateClick.bind(this),
        events: this.EventList,
      };
    }, 2500);
  }

  onDateClick(res) {
    alert('Clicked on date : ' + res.dateStr);
  }

  OnClickingAdd() {
    let latest_date = this.datepipe.transform(this.SelectedDate, 'yyyy-MM-dd');
    this.EventList.push({
      title: 'holiday',
      date: latest_date,
    });
  }

  OnClickingRemove() {}

  OnClickingGoTo() {
    if (this.SelectedDate != undefined) {
      let calendarApi = this.calendarComponent.getApi();
      let latest_date = this.datepipe.transform(
        this.SelectedDate,
        'yyyy-MM-dd'
      );
      calendarApi.gotoDate(latest_date);
    }
  }
}
