import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IvLookupPageComponent } from './iv-lookup-page.component';

describe('IvLookupPageComponent', () => {
  let component: IvLookupPageComponent;
  let fixture: ComponentFixture<IvLookupPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IvLookupPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IvLookupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
