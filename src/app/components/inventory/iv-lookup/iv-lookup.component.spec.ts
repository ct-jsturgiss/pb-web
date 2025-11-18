import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IvLookupComponent } from './iv-lookup.component';

describe('IvLookupComponent', () => {
  let component: IvLookupComponent;
  let fixture: ComponentFixture<IvLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IvLookupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IvLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
