import {
  ApexAxisChartSeries,
  ApexChart,
  ApexResponsive,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill,
  ApexNonAxisChartSeries,
  ApexAnnotations,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexGrid,
  ApexStates,
  ApexTheme,
  ApexMarkers,
  ApexNoData,
} from 'ng-apexcharts';

export type ChartOptions = {
  chart: ApexChart;
  annotations: ApexAnnotations;
  colors: string[];
  dataLabels: any;
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  stroke: ApexStroke;
  labels: string[];
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  grid: ApexGrid;
  states: ApexStates;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
  theme: ApexTheme;
  markers: ApexMarkers;
  noData: ApexNoData;
};
