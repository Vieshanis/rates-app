import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatesPeriodComponent } from './rates-period.component';

describe('RatesPeriodComponent', () => {
  let component: RatesPeriodComponent;
  let fixture: ComponentFixture<RatesPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatesPeriodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatesPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
