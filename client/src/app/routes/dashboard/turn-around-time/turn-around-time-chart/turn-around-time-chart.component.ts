import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { TurnAroundTimeService } from '../turn-around-time.service';

import { ChartOptions } from '@core/models/chart';

@Component({
  selector: 'app-turn-around-time-chart',
  templateUrl: './turn-around-time-chart.component.html',
  styleUrls: ['./turn-around-time-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TurnAroundTimeChartComponent implements OnInit {
  category: string;
  tatRanges: any[];
  turnAroundTimeBreakoutChart: Partial<ChartOptions>;

  startTat: number[];
  endTat: number[];
  pieChartLabels: string[];

  constructor(private turnAroundTimeService: TurnAroundTimeService) {}

  ngOnInit(): void {
    //Default tat breakout
    this.startTat = [1, 5, 8, 15, 31, 60];
    this.endTat = [4, 7, 14, 30, 60, 90];

    //Initialize the chart
    this.createTatBreakoutChart();
    //Create labels with default values
    this.createPieChartLabels(this.startTat, this.endTat);
    //Create chart
    this.getTatBreakoutChart(this.startTat, this.endTat);
    //Called when a different category is selected
    this.turnAroundTimeService.category.subscribe((category: string) => {
      this.category = category;
      this.getTatBreakoutChart(this.startTat, this.endTat);
    });
    //Called when the tat breakout ranges change
    this.turnAroundTimeService.tatRanges.subscribe((tatRanges: any[]) => {
      this.startTat = tatRanges[0];
      this.endTat = tatRanges[1];
      this.createPieChartLabels(this.startTat, this.endTat);
      this.getTatBreakoutChart(this.startTat, this.endTat);
    });
  }

  //Initializing the chart
  createTatBreakoutChart() {
    this.turnAroundTimeBreakoutChart = {
      series: [],
      chart: {
        id: 'turn-around-time-breakout',
        width: 600,
        type: 'donut',
        height: 450,
        toolbar: { show: true },
        events: {
          dataPointSelection: (event, chartContext, config) => {
            var duration = config.w.config.labels[config.dataPointIndex];
            const tatArray = duration.replace(' days', '').split('-');
            const startTatRange = parseInt(tatArray[0], 10);
            const endTatRange = parseInt(tatArray[1], 10);
            this.turnAroundTimeService.selectedTatRange.next([
              startTatRange,
              endTatRange,
            ]);
          },
        },
      },
      plotOptions: {
        pie: {
          dataLabels: {
            offset: 0,
            minAngleToShowLabel: 0,
          },
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '22px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                color: undefined,
                offsetY: -10,
                formatter: function (val) {
                  return val;
                },
              },
              value: {
                show: true,
                fontSize: '16px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 400,
                color: undefined,
                offsetY: 16,
                formatter: function (val) {
                  return val;
                },
              },
              total: {
                show: true,
                showAlways: false,
                label: 'Total',
                fontSize: '22px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                color: '#373d3f',
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0);
                },
              },
            },
          },
        },
      },

      labels: this.pieChartLabels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      noData: {
        text: 'Loading...',
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          return `${opts.w.config.series[opts.seriesIndex]} :
          ${val.toFixed(1)}%`;
        },
        style: {
          fontSize: '14px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
        },
      },
    };
  }

  //Function to create labels from startTat and endTat arrays
  createPieChartLabels(tatStart: number[], tatEnd: number[]) {
    this.pieChartLabels = [];
    for (let i = 0; i < this.startTat.length; i++) {
      let chartlabel = tatStart[i] + '-' + tatEnd[i] + ' days';
      this.pieChartLabels.push(chartlabel);
    }
  }

  //fetches the value from backend and updates them
  getTatBreakoutChart(tatStart: number[], tatEnd: number[]): void {
    this.turnAroundTimeService
      .getTatBreakout(tatStart, tatEnd, this.category)
      .subscribe((data) => {
        ApexCharts.exec('turn-around-time-breakout', 'updateOptions', {
          series: data,
          labels: this.pieChartLabels,
        });
      });
  }
}
