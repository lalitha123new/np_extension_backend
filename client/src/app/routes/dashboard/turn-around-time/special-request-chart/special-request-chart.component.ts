import { Component, OnInit } from '@angular/core';
import { ChartOptions } from '@core/models/chart';
import { TurnAroundTimeService } from '../turn-around-time.service';

@Component({
  selector: 'app-special-request-chart',
  templateUrl: './special-request-chart.component.html',
  styleUrls: ['./special-request-chart.component.scss'],
})
export class SpecialRequestChartComponent implements OnInit {
  duration: number[];
  category: string;
  specialRequestBreakoutChart: Partial<ChartOptions>;
  startTat: number;
  endTat: number;

  constructor(private turnAroundTimeService: TurnAroundTimeService) {}

  ngOnInit(): void {
    //Called on init
    this.createSpecialRequestChart();

    //Called when the selected category is changed
    this.turnAroundTimeService.category.subscribe((value) => {
      this.category = value;
      //Check to prevent api call when startTat and endTat are undefined
      if (this.startTat != null && this.endTat != null)
        this.getSpecialRequestChart(this.startTat, this.endTat, this.category);
    });

    //Called when the selected tat duration is changed
    this.turnAroundTimeService.selectedTatRange.subscribe((value) => {
      this.startTat = value[0];
      this.endTat = value[1];
      this.getSpecialRequestChart(this.startTat, this.endTat, this.category);
    });
  }

  //Creates and empty chart
  createSpecialRequestChart() {
    this.specialRequestBreakoutChart = {
      series: [],
      chart: {
        id: 'special-request-chart',
        height: 450,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
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
        offsetX: 20,
        style: {
          fontSize: '12px',
          colors: ['#000000'],
        },
      },
      xaxis: {
        categories: [],
        labels: {
          rotate: -45,
        },
      },
      yaxis: {
        title: {
          text: 'Special Request',
          style: {
            fontWeight: 'bold',
            fontSize: '12px',
          },
        },
      },
      noData: {
        text: 'Data Loading, Please wait',
      },
    };
  }

  getSpecialRequestChart(
    startDate: number,
    endDate: number,
    category: string
  ): void {
    const typeNames = [];
    const typeSampleCount = [];

    //Fetches data from the backend
    this.turnAroundTimeService
      .getSpecialRequests(startDate, endDate, category)
      .subscribe((data) => {
        if (data.length === 0) {
          ApexCharts.exec('special-request-chart', 'updateOptions', {
            xaxis: {
              categories: [],
            },
            series: [],
          });
        }
        data.forEach((object) => {
          typeNames.push(object.requestType);
          typeSampleCount.push(object.count);

          //Updating th charts
          ApexCharts.exec('special-request-chart', 'updateOptions', {
            xaxis: {
              categories: typeNames,
            },
            series: [
              {
                name: 'cases',
                data: typeSampleCount,
              },
            ],
          });
        });
      });
  }
}
