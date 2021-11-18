// import { SamplesPendingCasesService } from '../../samples-pending-cases/samplesPendingCases.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PendingCasesService } from '../pending-cases.service';

@Component({
  selector: 'app-pending-cases-chart',
  templateUrl: './pending-cases-chart.component.html',
  styleUrls: ['./pending-cases-chart.component.scss'],
})
export class PendingCasesChartComponent implements OnInit {
  ChartInfo = [];
  pendingCasesChart = null;
  chart1 = null;
  categories: string[];
  startTat: number[];
  endTat: number[];
  type: String = 'all';
  parity: String = 'all';

  constructor(private pendingService: PendingCasesService) {}

  ngOnInit(): void {
    this.startTat = [1, 5, 8, 15, 31, 61];
    this.endTat = [4, 7, 14, 30, 60, 90];
    this.createCategories(this.startTat, this.endTat);
    this.createPendingCaseChart();
    this.getPendingCasesChart(
      this.startTat,
      this.endTat,
      this.type,
      this.parity
    );

    this.pendingService.pendingCaseRanges.subscribe(
      (pendingCaseRanges: any[]) => {
        this.startTat = pendingCaseRanges[0];
        this.endTat = pendingCaseRanges[1];
        this.createCategories(this.startTat, this.endTat);

        this.getPendingCasesChart(
          this.startTat,
          this.endTat,
          this.type,
          this.parity
        );
      }
    );

    this.pendingService.type.subscribe((type: String) => {
      this.type = type;
      this.getPendingCasesChart(
        this.startTat,
        this.endTat,
        this.type,
        this.parity
      );
    });

    this.pendingService.parity.subscribe((parity: String) => {
      this.parity = parity;
      this.getPendingCasesChart(
        this.startTat,
        this.endTat,
        this.type,
        this.parity
      );
    });
  }

  createPendingCaseChart() {
    this.pendingCasesChart = {
      series: [
        {
          name: 'Pending Cases',
          data: [],
        },
      ],
      chart: {
        id: 'pending-cases-chart',
        height: 350,
        type: 'bar',
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
        categories: [],
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
        title: {
          text: 'Day Range',
          fontWeight: 'bold',
          fontSize: '12px',
        },
      },

      yaxis: {
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: true,
        },
        labels: {
          show: true,
          formatter: function (val) {
            return val + '';
          },
        },
        title: {
          text: 'No of pending cases',
          fontSize: '12px',
          fontWeight: 'bold',
        },
      },
      noData: {
        text: 'Data Loading, Please wait',
      },
    };
  }

  createCategories(startTat, endTat) {
    this.categories = [];
    for (let i = 0; i < startTat.length; i++) {
      let chartCategory = startTat[i] + '-' + endTat[i] + ' days';
      this.categories.push(chartCategory);
    }
  }

  getPendingCasesChart(startTat, endTat, type, parity): void {
    this.pendingService
      .getCharts(startTat, endTat, type, parity)
      .subscribe((data) => {
        ApexCharts.exec('pending-cases-chart', 'updateOptions', {
          xaxis: {
            categories: this.categories,
          },
          series: [
            {
              name: 'Pending cases',
              data: data,
            },
          ],
        });
      });
  }
}
