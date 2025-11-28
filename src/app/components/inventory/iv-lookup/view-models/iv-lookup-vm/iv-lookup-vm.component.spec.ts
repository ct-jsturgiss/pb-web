import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IvLookupVmComponent } from './iv-lookup-vm.component';

describe('IvLookupVmComponent', () => {
  let component: IvLookupVmComponent;
  let fixture: ComponentFixture<IvLookupVmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IvLookupVmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IvLookupVmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
