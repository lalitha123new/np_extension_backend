import { MatPaginatorModule } from '@angular/material/paginator';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TurnAroundTimeComponent } from './turn-around-time/turn-around-time.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CaseDistributionChartComponent } from './turn-around-time/case-distribution-chart/case-distribution-chart.component';
import { DateRangePickerComponent } from './turn-around-time/utils/date-range-picker/date-range-picker.component';
import { DayRangeDialogComponent } from './turn-around-time/utils/day-range-dialog/day-range-dialog.component';
import { DayrangeDialogBoxComponent } from './turn-around-time/utils/day-range-dialog/dayrange-dialog-box/dayrange-dialog-box.component';
import { SpecialRequestChartComponent } from './turn-around-time/special-request-chart/special-request-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PendingCasesChartComponent } from './pending-cases/pending-cases-chart/pending-cases-chart.component';
import { PendingCasesTableComponent } from './pending-cases/pending-cases-table/pending-cases-table.component';
import { TotalChartComponent } from './samples/total-chart/total-chart.component';
import { PendingAddfilterComponent } from './pending-cases/pending-addfilter/pending-addfilter.component';
import { PendingAddfilterDialogComponent } from './pending-cases/pending-addfilter/pending-addfilter-dialog/pending-addfilter-dialog.component';
import { TurnAroundTimeChartComponent } from './turn-around-time/turn-around-time-chart/turn-around-time-chart.component';
import { PendingInfoDialogComponent } from './pending-cases/pending-cases-table/pending-info-dialog/pending-info-dialog.component';
import { SamplesComponent } from './samples/samples.component';
import { PendingCasesComponent } from './pending-cases/pending-cases.component';

const COMPONENTS = [
  TurnAroundTimeComponent,
  PendingCasesComponent,
  SamplesComponent,
];
const COMPONENTS_DYNAMIC = [
  CaseDistributionChartComponent,
  SpecialRequestChartComponent,
  TurnAroundTimeChartComponent,
  DateRangePickerComponent,
  DayrangeDialogBoxComponent,
  DayRangeDialogComponent,
  TotalChartComponent,
  PendingCasesChartComponent,
  PendingCasesTableComponent,
  PendingAddfilterComponent,
  PendingCasesComponent,
  PendingAddfilterDialogComponent,
  PendingInfoDialogComponent,
  PendingCasesChartComponent,
];

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
    NgApexchartsModule,
    MatPaginatorModule,
  ],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class DashboardModule {}
