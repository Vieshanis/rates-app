import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as moment from 'moment';
import { of } from 'rxjs';
import { FormatedRatesData, GetRatesData } from '../shared/data';
import { GLOBALS } from '../shared/globals';
import { RatesRoutingModule } from './rates-routing.module';

import { RatesComponent } from './rates.component';

describe('RatesComponent', () => {
  let component: RatesComponent;
  let fixture: ComponentFixture<RatesComponent>;
  let getRatesSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RatesComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RatesRoutingModule,
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
    fixture = TestBed.createComponent(RatesComponent);
    component = fixture.componentInstance;

    getRatesSpy = spyOn<any>(component['ratesService'], 'getRates').and.callFake(() => of(GetRatesData));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create formGroup after ngOnInit is called', () => {
    const date = new Date();
    const formGroup = new FormGroup({
      base: new FormControl(GLOBALS.defaultCurrency),
      date: new FormControl(date)
    });
    component.form.controls.date.setValue(date);
    fixture.detectChanges();

    expect(component.form.value).toEqual(formGroup.value);
  });

  it('should call ratesService.getRates after ngOnInit', () => {
    expect(getRatesSpy).toHaveBeenCalled();
  });

  it('should call ratesService.getRates after ngOnInit with correct values', () => {
    expect(getRatesSpy).toHaveBeenCalledWith('EUR', moment().format(GLOBALS.dateFormat));
  });

  it('should call ratesService.getRates on form.controls.base.valueChange', () => {
    component.form.controls.base.setValue('AUD');
    // Because of async pipe ratesService.getRatesSpy will be already called once after ngOnInit
    expect(getRatesSpy).toHaveBeenCalledTimes(2);
  });

  it('should call ratesService.getRates on form.controls.date.valueChange with correct value', () => {
    component.form.controls.date.setValue('2020-10-15T15:11:22.341Z');
    expect(getRatesSpy).toHaveBeenCalledTimes(2);
  });

  it('should not call ratesService.getRates on form.controls.date.valueChange with value past min date', () => {
    component.form.controls.date.setValue('1850-10-15T15:11:22.341Z');
    expect(getRatesSpy).toHaveBeenCalledTimes(1);
  });

  it('should not call ratesService.getRates on form.controls.date.valueChange with value past max date', () => {
    component.form.controls.date.setValue('2220-10-15T15:11:22.341Z');
    expect(getRatesSpy).toHaveBeenCalledTimes(1);
  });

  it('should return filtered and sorted data after calling ratesService.getRates', done => {
    component.rates$.subscribe(res => {
      expect(res).toEqual(FormatedRatesData);
      done();
    });
  });

});
