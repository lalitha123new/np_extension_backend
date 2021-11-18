import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PendingCasesService } from '../../pending-cases.service';
import { MtxGridColumn } from '@ng-matero/extensions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pending-info-dialog',
  templateUrl: './pending-info-dialog.component.html',
  styleUrls: ['./pending-info-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PendingInfoDialogComponent implements OnInit, OnDestroy {
  columns: MtxGridColumn[] = [
    {
      header: 'Field',
      field: 'field',
      width: '50%',
    },
    {
      header: 'Data',
      field: 'data',
      width: '50%',
    },
  ];

  npNo: any;
  list = [];
  length: number;
  npNoSubscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<PendingInfoDialogComponent>,
    private pendingService: PendingCasesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.list = [];
    this.length = 0;
    this.getNpNo();
  }

  ngOnDestroy(): void {
    this.npNoSubscription.unsubscribe();
  }

  getCaseDetails(npNo) {
    this.pendingService.pendingInfo.subscribe((data) => {
      this.list.push({
        field: 'Np Number',
        data: data.npNumber,
      });
      this.list.push({
        field: 'Patient Name',
        data: data.patientName,
      });
      this.list.push({
        field: 'Asset Id',
        data: data.assetId,
      });
      this.list.push({
        field: 'Biopsy Type',
        data: data.biopsy,
      });
      this.list.push({
        field: 'Start Time',
        data: data.start_time,
      });
      this.list.push({
        field: 'Current State',
        data: data.currentState,
      });
      this.list.push({
        field: 'Next State',
        data: data.nextState,
      });
      this.length = this.list.length;
      this.cdr.detectChanges();
    });
  }
  getNpNo(): void {
    this.npNoSubscription = this.pendingService.npNo.subscribe(
      (npNumber: any) => {
        console.log(npNumber);
        this.npNo = npNumber;
        this.getCaseDetails(this.npNo);
      }
    );
  }

  // onNoClick() {
  //   this.dialogRef.close();
  // }
}
