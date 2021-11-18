import { DayrangeDialogBoxComponent } from './dayrange-dialog-box/dayrange-dialog-box.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: 'app-day-range-dialog',
  templateUrl: './day-range-dialog.component.html',
  //styleUrls: ['./day-range-dialog.component.scss']
})
export class DayRangeDialogComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  OpenDayRangeDialog()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(DayrangeDialogBoxComponent)
  }

}
