import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IvUnitsViewComponent } from './iv-units-view.component';

describe('IvUnitsViewComponent', () => {
  let component: IvUnitsViewComponent;
  let fixture: ComponentFixture<IvUnitsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IvUnitsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IvUnitsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
