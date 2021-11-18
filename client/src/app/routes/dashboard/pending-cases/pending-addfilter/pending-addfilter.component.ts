import { PendingAddfilterDialogComponent } from './pending-addfilter-dialog/pending-addfilter-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-pending-addfilter',
  templateUrl: './pending-addfilter.component.html',
  styleUrls: ['./pending-addfilter.component.scss']
})
export class PendingAddfilterComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  OpenAddFilterDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(PendingAddfilterDialogComponent);
  }
}

