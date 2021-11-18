import { PendingInfoDialogComponent } from './pending-info-dialog/pending-info-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { PendingCasesService } from '../pending-cases.service';
import { MtxGridColumn } from '@ng-matero/extensions';

@Component({
  selector: 'app-pending-cases-table',
  templateUrl: './pending-cases-table.component.html',
  styleUrls: ['./pending-cases-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PendingCasesTableComponent implements OnInit {
  columns: MtxGridColumn[] = [
    {
      header: 'NP Number',
      field: 'npNumber',
      width: '25%',
    },
    {
      header: 'Biopsy type',
      field: 'biopsyType',
      width: '25%',
    },
    {
      header: 'Start Time',
      field: 'startTime',
      width: '25%',
    },
    {
      header: 'Operation',
      field: 'operation',
      width: '25%',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          color: 'primary',
          icon: 'info',
          click: (record) => {
            this.showInfoDialog(record);
          },
          tooltip: 'Get Information',
        },
      ],
    },
  ];
  list = [];
  total = 0;
  isLoading = true;
  SamplesPerPage = 10;
  pageNo = 1;
  tableData = [];
  type: String = 'all';
  parity: String = 'all';

  constructor(
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private pendingService: PendingCasesService
  ) {}

  ngOnInit(): void {
    this.getTableInfo();

    this.pendingService.type.subscribe((type: String) => {
      this.type = type;
      this.getTableInfo();
    });

    this.pendingService.parity.subscribe((parity: String) => {
      this.parity = parity;
      this.getTableInfo();
    });
  }

  getTableInfo() {
    this.pendingService.getCases(this.type, this.parity).subscribe((data) => {
      this.tableData = data;
      this.total = this.tableData.length;
      this.list = this.tableData.slice(
        this.SamplesPerPage * (this.pageNo - 1),
        this.SamplesPerPage * this.pageNo
      );
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  getNextPage(e: PageEvent) {
    this.isLoading = true;
    this.SamplesPerPage = e.pageSize;
    this.pageNo = e.pageIndex;
    let startIndex = this.SamplesPerPage * this.pageNo;
    let endIndex = startIndex + this.SamplesPerPage;
    this.list = this.tableData.slice(startIndex, endIndex);
    this.isLoading = false;
    this.cdr.detectChanges();
  }

  showInfoDialog(value: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    const dialog = this.dialog.open(PendingInfoDialogComponent, dialogConfig);
    dialog.afterOpened().subscribe(() => {
      this.pendingService.npNo.next(value.npNumber);
    });
  }
}
