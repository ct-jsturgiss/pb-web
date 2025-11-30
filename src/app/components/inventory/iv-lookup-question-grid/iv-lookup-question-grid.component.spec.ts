import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IvLookupQuestionGridComponent } from './iv-lookup-question-grid.component';

describe('IvLookupQuestionGridComponent', () => {
  let component: IvLookupQuestionGridComponent;
  let fixture: ComponentFixture<IvLookupQuestionGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IvLookupQuestionGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IvLookupQuestionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
