import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigManageComponent } from './config-manage.component';

describe('ConfigManageComponent', () => {
  let component: ConfigManageComponent;
  let fixture: ComponentFixture<ConfigManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
