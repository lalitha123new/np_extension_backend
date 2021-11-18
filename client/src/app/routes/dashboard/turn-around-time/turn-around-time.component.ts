import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  NgZone,
} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TurnAroundTimeService } from './turn-around-time.service';

@Component({
  selector: 'app-turn-around-time',
  templateUrl: 'turn-around-time.component.html',
  styleUrls: ['./turn-around-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TurnAroundTimeComponent implements OnInit {
  //Checks to be used in html ngIf
  isCategorySelected = 0;
  isDurationSelected = 0;

  //Selected category and duration to display on the chart card
  selectedCategory = '';
  selectedDuration: number[];

  constructor(
    private cds: ChangeDetectorRef,
    private turnAroundTimeService: TurnAroundTimeService
  ) {}

  ngOnInit() {
    this.turnAroundTimeService.category.subscribe((category) => {
      if (category != '') this.categorySelected(category);
    });
    this.turnAroundTimeService.selectedTatRange.subscribe((tatRange) => {
      if (tatRange.length !== 0) this.tatDurationSelected(tatRange);
    });
  }

  categorySelected(category: string) {
    this.isCategorySelected = 1;
    this.selectedCategory = category;
    this.cds.detectChanges();
  }

  tatDurationSelected(range: number[]) {
    this.isDurationSelected = 1;
    this.selectedDuration = range;
    this.cds.detectChanges();
  }
}
