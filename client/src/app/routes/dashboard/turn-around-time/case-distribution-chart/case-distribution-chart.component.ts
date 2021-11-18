import { Component, OnInit, ViewChild } from '@angular/core';

import { DatePipe } from '@angular/common';
import { TurnAroundTimeService } from '../turn-around-time.service';

import { ChartComponent } from 'ng-apexcharts';
import { ChartOptions } from '@core/models/chart';

@Component({
  selector: 'app-case-distribution-chart',
  templateUrl: './case-distribution-chart.component.html',
  styleUrls: ['./case-distribution-chart.component.scss'],
})
export class CaseDistributionChartComponent implements OnInit {
  startDate: any;
  endDate: any;
  // @ViewChild('chart') chart: ChartComponent;
  caseDistributionChart: Partial<ChartOptions>;

  constructor(
    private turnAroundTimeService: TurnAroundTimeService,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    //called on init
    this.startDate = new Date();
    this.startDate.setMonth(this.startDate.getMonth() - 6);
    this.startDate = this.datepipe.transform(this.startDate, 'yyyy-MM-dd');
    this.endDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.createCaseDistributionChart();
    this.getCaseDistributionChart(this.startDate, this.endDate);

    //called when new dates are passed
    this.turnAroundTimeService.dates.subscribe((dates: string[]) => {
      this.startDate = dates[0];
      this.endDate = dates[1];
      this.getCaseDistributionChart(this.startDate, this.endDate);
    });
  }

  createCaseDistributionChart() {
    this.caseDistributionChart = {
      series: [
        {
          name: 'No of Cases',
          data: [],
        },
      ],
      chart: {
        id: 'case-distribution-chart',
        height: 350,
        type: 'bar',
        events: {
          dataPointSelection: (event, chartContext, config) => {
            const category =
              config.w.config.xaxis.categories[config.dataPointIndex];

            this.turnAroundTimeService.category.next(category);
          },
        },
      },

      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + '';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#000000'],
        },
      },
      xaxis: {
        categories: [
          'Tumor',
          'Nerve',
          'Muscle',
          'Multiple Biopsies',
          'Epilepsy',
          'Block',
          'Slides',
          'Other',
        ],
        position: 'bottom',
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        title: {
          text: 'Biopsy Type',
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
          },
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
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: true,
          formatter: function (val) {
            return val + '';
          },
        },
        title: {
          text: 'Total Cases',
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
          },
        },
      },
      title: {
        text: 'Case Distribution Chart',
        align: 'left',
        style: {
          fontSize: '20px',
        },
      },
      subtitle: {
        text: '',
      },
      noData: {
        text: 'Data Loading, please wait',
      },
    };
  }

  //fetch data from the backend
  getCaseDistributionChart(start: any, end: any): void {
    this.startDate = start;
    this.endDate = end;
    this.turnAroundTimeService
      .getCharts(this.startDate, this.endDate)
      .subscribe((data) => {
        ApexCharts.exec('case-distribution-chart', 'updateOptions', {
          series: [
            {
              name: 'Total cases',
              data: data,
            },
          ],
          subtitle: {
            text: `${start} - ${end}`,
          },
        });
      });
  }
}
