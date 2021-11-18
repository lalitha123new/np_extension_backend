import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartOptions } from '@core/models/chart';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SamplesService } from '../samples.service';
@Component({
  selector: 'app-total-chart',
  templateUrl: './total-chart.component.html',
  styleUrls: ['./total-chart.component.scss'],
})
export class TotalChartComponent implements OnInit {
  totalChart: Partial<ChartOptions>;

  subscription: Subscription;
  InternalSamples = [];
  ExternalSamples = [];
  TotalSamples = [];
  dateLabels = [];

  constructor(
    private sampleService: SamplesService,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.createLabels();
    this.createTotalChart();
    this.subscription = timer(0, 5 * 60 * 1000)
      .pipe(switchMap(() => this.sampleService.getSamples()))
      .subscribe((data) => this.getTotalChart(data));
  }

  createLabels() {
    this.dateLabels = [];

    for (let i = 0; i <= 13; i++) {
      let date = new Date();
      date.setDate(new Date().getDate() - 13 + i);
      const transformedDate = this.datepipe.transform(date, 'dd-MM-yyyy');
      this.dateLabels.push(transformedDate);
    }
  }
  getTotalChart(data) {
    this.InternalSamples = [];
    this.ExternalSamples = [];
    this.TotalSamples = [];

    data.forEach((object) => {
      this.InternalSamples.push(object.internalCasesCount);
      this.ExternalSamples.push(object.externalCasesCount);
      this.TotalSamples.push(
        object.internalCasesCount + object.externalCasesCount
      );
    });
    ApexCharts.exec('samples-chart', 'updateSeries', [
      {
        name: 'Internal Samples',
        data: this.InternalSamples,
      },
      {
        name: 'External Samples',
        data: this.ExternalSamples,
      },
      {
        name: 'Total Samples',
        data: this.TotalSamples,
      },
    ]);
  }

  createTotalChart() {
    this.totalChart = {
      series: [],
      chart: {
        id: 'samples-chart',
        height: 350,
        type: 'area',
        events: {
          dataPointSelection: (event, chartContext, config) => {
            const category =
              config.w.config.xaxis.categories[config.dataPointIndex];
          },
        },

        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        },
      },
      title: {
        text: 'Samples',
        align: 'left',
        style: {
          fontSize: '20px',
          fontWeight: 'bold',
        },
      },
      dataLabels: {
        enabled: false,
        formatter: function (val) {
          return '.';
        },
        offsetY: 0,
        style: {
          fontSize: '12px',
          colors: ['#000000'],
          fontWeight: 'bold',
        },
      },

      markers: {
        size: 5,
        hover: {
          size: 6,
        },
      },
      xaxis: {
        categories: this.dateLabels,
        title: {
          text: 'Date',
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
          },
        },
        position: 'bottom',
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
      },

      yaxis: {
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: true,
        },
        title: {
          text: 'Number of samples',
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
          },
        },

        labels: {
          show: true,
          formatter: function (val) {
            return val + '';
          },
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
      noData: {
        text: 'Data Loading, please wait',
      },
    };
  }
}
