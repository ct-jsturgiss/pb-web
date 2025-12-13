import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IvPartViewComponent } from './iv-part-view.component';

describe('IvPartViewComponent', () => {
  let component: IvPartViewComponent;
  let fixture: ComponentFixture<IvPartViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IvPartViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IvPartViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
