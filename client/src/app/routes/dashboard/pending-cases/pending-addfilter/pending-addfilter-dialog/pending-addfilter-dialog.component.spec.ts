import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingAddfilterDialogComponent } from './pending-addfilter-dialog.component';

describe('PendingAddfilterDialogComponent', () => {
  let component: PendingAddfilterDialogComponent;
  let fixture: ComponentFixture<PendingAddfilterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingAddfilterDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingAddfilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
