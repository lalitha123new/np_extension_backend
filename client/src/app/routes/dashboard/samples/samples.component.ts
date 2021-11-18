import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SamplesService } from './samples.service';

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.scss'],
})
export class SamplesComponent implements OnInit {
  constructor(private sampleService: SamplesService) {}
  stats = [];
  tatSubscription: Subscription;
  monthCountSubscription: Subscription;
  yearCountSubscription: Subscription;

  ngOnInit(): void {
    this.tatSubscription = timer(0, 5 * 60 * 1000)
      .pipe(switchMap(() => this.sampleService.getStats()))
      .subscribe((data) => {
        this.updateTatStats(data);
      });
    this.monthCountSubscription = timer(0, 5 * 60 * 1000)
      .pipe(switchMap(() => this.sampleService.getMonthCount()))
      .subscribe((data) => this.updateMonthCount(data));
    this.yearCountSubscription = timer(0, 5 * 60 * 1000)
      .pipe(switchMap(() => this.sampleService.getYearCount()))
      .subscribe((data) => this.updateYearCount(data));
  }

  updateTatStats(data) {
    this.stats.forEach((data) => {
      if (data.title === 'Average Turn Around time') {
        const idx = this.stats.indexOf(data);
        this.stats.splice(idx, 1);
      }
    });
    this.stats.forEach((data) => {
      if (data.title === 'Maximum Turn Around time') {
        const idx = this.stats.indexOf(data);
        this.stats.splice(idx, 1);
      }
    });
    this.stats.push({
      title: 'Average Turn Around time',
      amount: data.mean,
      days: '14 days',
      color: 'bg-indigo-500',
    });
    this.stats.push({
      title: 'Maximum Turn Around time',
      amount: data.max,
      days: '14 days',

      color: 'bg-blue-500',
    });
  }
  updateMonthCount(data) {
    this.stats.forEach((data) => {
      if (data.days === 'This Month') {
        const idx = this.stats.indexOf(data);
        this.stats.splice(idx, 1);
      }
    });
    this.stats.push({
      title: 'Total Cases',
      amount: data,
      days: 'This Month',
      color: 'bg-green-500',
    });
  }

  updateYearCount(data) {
    this.stats.forEach((data) => {
      if (data.days === 'This year') {
        const idx = this.stats.indexOf(data);
        this.stats.splice(idx, 1);
      }
    });
    this.stats.push({
      title: 'Total Cases',
      amount: data,
      days: 'This year',
      color: 'bg-teal-500',
    });
  }
}
