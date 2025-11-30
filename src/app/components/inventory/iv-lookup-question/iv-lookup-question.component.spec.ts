import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IvLookupQuestionComponent } from './iv-lookup-question.component';

describe('IvLookupQuestionComponent', () => {
  let component: IvLookupQuestionComponent;
  let fixture: ComponentFixture<IvLookupQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IvLookupQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IvLookupQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
