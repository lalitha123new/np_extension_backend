import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridColumn } from '@ng-matero/extensions';

import { TranslateService } from '@ngx-translate/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { TurnAroundTimeService } from '../../../turn-around-time.service';

@Component({
  selector: 'app-dayrange-dialog-box',
  templateUrl: './dayrange-dialog-box.component.html',
  styleUrls: ['./dayrange-dialog-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayrangeDialogBoxComponent implements OnInit {
  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('Start value'),
      field: 'start',
      sortable: true,
      minWidth: 75,
    },
    {
      header: this.translate.stream('End Value'),
      field: 'end',
      sortable: true,
      minWidth: 75,
    },
    {
      header: this.translate.stream('Operation'),
      field: 'operation',
      minWidth: 75,
      width: '120px',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          color: 'warn',
          icon: 'delete',
          text: this.translate.stream('table_kitchen_sink.delete'),
          tooltip: this.translate.stream('table_kitchen_sink.delete'),
          pop: true,
          popTitle: this.translate.stream('table_kitchen_sink.confirm_delete'),
          popCloseText: this.translate.stream('table_kitchen_sink.close'),
          popOkText: this.translate.stream('table_kitchen_sink.ok'),
          click: (record) => this.delete(record),
        },
      ],
    },
  ];

  rangeFilters = [];
  startvalue: number;
  endvalue: number;
  note: string;
  isLoading = false;
  @Output() tatRangeSelectedEvent = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<DayrangeDialogBoxComponent>,

    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private turnAroundTimeService: TurnAroundTimeService
  ) {}

  ngOnInit(): void {
    this.note = '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  OnClickingApply() {
    this.note = '';
    if (this.rangeFilters.length == 0) {
      this.note = 'Note: Add atleast one filter.';
    } else {
      this.note = '';
      this.startvalue = null;
      this.endvalue = null;
      this.onNoClick();
      let startTat = [],
        endTat = [];
      for (let i = 0; i < this.rangeFilters.length; i++) {
        startTat.push(this.rangeFilters[i].start);
        endTat.push(this.rangeFilters[i].end);
      }
      this.tatRangeSelectedEvent.emit([startTat, endTat]);
      this.turnAroundTimeService.tatRanges.next([startTat, endTat]);
    }
  }

  OnClickingAdd(): void {
    this.note = '';
    this.isLoading = true;

    if (this.startvalue == undefined) {
      this.note = 'Note: Please Enter the start value';
      return;
    }
    if (this.endvalue == undefined) {
      this.note = 'Note: Please Enter the end value';
      return;
    }

    if (this.endvalue < this.startvalue) {
      this.note = 'Note: End value cannot be greater than end value.';
      this.startvalue = null;
      this.endvalue = null;
      return;
    }

    for (let i = 0; i < this.rangeFilters.length; i++) {
      if (
        this.rangeFilters[i].start == this.startvalue ||
        this.rangeFilters[i].end == this.endvalue
      ) {
        this.note = 'Note: This filter has already been added.';
        return;
      }
    }

    this.rangeFilters.push({
      start: this.startvalue,
      end: this.endvalue,
    });

    this.startvalue = null;
    this.endvalue = null;
    this.cdr.detectChanges();

    this.isLoading = false;
  }

  OnClickingClear() {
    this.rangeFilters = [];
    this.note = '';
    this.startvalue = null;
    this.endvalue = null;
  }

  delete(value: any) {
    this.isLoading = true;
    const idx = this.rangeFilters.indexOf(value);
    if (idx > -1) {
      this.rangeFilters.splice(idx, 1);
    }
    this.cdr.detectChanges();
    this.isLoading = false;
  }
}
