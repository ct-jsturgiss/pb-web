import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageIvUnitDialogComponent } from './manage-iv-unit-dialog.component';

describe('ManageIvUnitDialogComponent', () => {
  let component: ManageIvUnitDialogComponent;
  let fixture: ComponentFixture<ManageIvUnitDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageIvUnitDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageIvUnitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
