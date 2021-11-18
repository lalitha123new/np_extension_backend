import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingInfoDialogComponent } from './pending-info-dialog.component';

describe('PendingInfoDialogComponent', () => {
  let component: PendingInfoDialogComponent;
  let fixture: ComponentFixture<PendingInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
