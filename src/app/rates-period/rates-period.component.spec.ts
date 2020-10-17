import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
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
import { GetRatesPeriodData } from '../shared/data';
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

  it('should call ratesPeriodService.getRatesPeriod after ngOnInit', fakeAsync(() => {
    tick(300);
    expect(getRatesPeriodSpy).toHaveBeenCalled();
  }));

  // it('should call ratesPeriodService.getRatesPeriod after ngOnInit with correct values', () => {
  //   expect(getRatesPeriodSpy).toHaveBeenCalledWith('EUR', moment().format(GLOBALS.dateFormat));
  // });

  // it('should call ratesPeriodService.getRatesPeriod on form.controls.base.valueChange', () => {
  //   component.form.controls.base.setValue('AUD');
  //   // Because of async pipe ratesPeriodService.getRatesPeriodPeriodSpy will be already called once after ngOnInit
  //   expect(getRatesPeriodSpy).toHaveBeenCalledTimes(2);
  // });

  // it('should call ratesPeriodService.getRatesPeriod on form.controls.date.valueChange with correct value', () => {
  //   component.form.controls.date.setValue('2020-10-15T15:11:22.341Z');
  //   expect(getRatesPeriodSpy).toHaveBeenCalledTimes(2);
  // });

  // it('should not call ratesPeriodService.getRatesPeriod on form.controls.date.valueChange with value past min date', () => {
  //   component.form.controls.date.setValue('1850-10-15T15:11:22.341Z');
  //   expect(getRatesPeriodSpy).toHaveBeenCalledTimes(1);
  // });

  // it('should not call ratesPeriodService.getRatesPeriod on form.controls.date.valueChange with value past max date', () => {
  //   component.form.controls.date.setValue('2220-10-15T15:11:22.341Z');
  //   expect(getRatesPeriodSpy).toHaveBeenCalledTimes(1);
  // });

  // it('should return filtered and sorted data after calling ratesPeriodService.getRatesPeriod', done => {
  //   component.rates$.subscribe(res => {
  //     expect(res).toEqual(FormatedRatesData);
  //     done();
  //   });
  // });


});
