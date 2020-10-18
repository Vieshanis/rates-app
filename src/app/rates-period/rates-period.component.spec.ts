import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as moment from 'moment';
import { of } from 'rxjs';
import { debounceTime, delay, take } from 'rxjs/operators';
import { FormatedRatesData, GetRatesPeriodData } from '../shared/data';
import { GLOBALS } from '../shared/globals';
import { RatesPeriodRoutingModule } from './rates-period-routing.module';

import { RatesPeriodComponent } from './rates-period.component';

describe('RatesPeriodComponent', () => {
  let component: RatesPeriodComponent;
  let fixture: ComponentFixture<RatesPeriodComponent>;
  let getRatesPeriodSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RatesPeriodComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RatesPeriodRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatesPeriodComponent);
    component = fixture.componentInstance;

    getRatesPeriodSpy = spyOn<any>(component['ratesPeriodService'], 'getRatesPeriod').and.callFake(() => of(GetRatesPeriodData));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create formGroup after ngOnInit is called', () => {
    const date = new Date();
    const formGroup = new FormGroup({
      base: new FormControl(GLOBALS.defaultCurrency),
      startDate: new FormControl(date),
      endDate: new FormControl(date),
    });

    component.form.controls.startDate.setValue(date);
    component.form.controls.endDate.setValue(date);
    fixture.detectChanges();

    expect(component.form.value).toEqual(formGroup.value);
  });

  it('should call ratesPeriodService.getRatesPeriod after ngOnInit', waitForAsync(() => {
    fixture.whenStable().then(() => {
      expect(getRatesPeriodSpy).toHaveBeenCalledTimes(1);
    });
  }));

  it('should call ratesPeriodService.getRatesPeriod after ngOnInit with correct values', waitForAsync(() => {
    fixture.whenStable().then(() => {
      expect(getRatesPeriodSpy).toHaveBeenCalledWith('EUR', moment().format(GLOBALS.dateFormat), moment().format(GLOBALS.dateFormat));
    });
  }));

});
