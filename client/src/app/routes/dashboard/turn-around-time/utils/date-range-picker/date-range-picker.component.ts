import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TurnAroundTimeService } from '../../turn-around-time.service';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
})
export class DateRangePickerComponent implements OnInit {
  @Output() dateSelectedEvent = new EventEmitter<string[]>();
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(
    private datepipe: DatePipe,
    private turnAroundTimeService: TurnAroundTimeService
  ) {}

  ngOnInit(): void {}

  OnClickingApply() {
    if (
      this.range.get('start').value != null &&
      this.range.get('end').value != null
    ) {
      const startDate = this.datepipe.transform(
        this.range.get('start').value,
        'yyyy-MM-dd'
      );
      const endDate = this.datepipe.transform(
        this.range.get('end').value,
        'yyyy-MM-dd'
      );

      this.turnAroundTimeService.dates.next([startDate, endDate]);
    }
  }
}
