import { Component, OnInit } from '@angular/core';
import { PendingCasesService } from './pending-cases.service';

@Component({
  selector: 'app-pending-cases',
  templateUrl: './pending-cases.component.html',
  styleUrls: ['./pending-cases.component.scss'],
})
export class PendingCasesComponent implements OnInit {
  constructor(private pendingService: PendingCasesService) {}
  typeSelected: String;
  allSelected: boolean;
  paritySelected: String;
  ngOnInit(): void {
    this.allSelected = true;
  }

  OnChangeParity(value: any) {
    this.paritySelected = value;
    this.pendingService.parity.next(value);
  }

  OnChangeType(value: any) {
    this.typeSelected = value;
    if (value === 'all') {
      this.allSelected = true;
    } else {
      this.allSelected = false;
    }
    this.pendingService.type.next(value);
  }
}
