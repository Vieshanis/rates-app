import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';
import { AllCurrencyNames } from '../shared/data';
import { GLOBALS } from '../shared/globals';
import { Rate } from '../shared/rates.model';
import { RatesService } from '../shared/services/rates.service';
import * as moment from 'moment';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss']
})
export class RatesComponent implements OnInit {

  public rates$: Observable<Rate[]>;
  public form: FormGroup;
  public currencyOptions = AllCurrencyNames;
  public minDate = new Date(GLOBALS.minDate);
  public maxDate = new Date();
  public displayedColumns: string[] = ['name', 'value'];

  constructor(
    private ratesService: RatesService,
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      base: GLOBALS.defaultCurrency,
      date: new Date()
    });

    this.rates$ = combineLatest([
      this.form.controls.base.valueChanges
        // Emit start value
        .pipe(startWith(GLOBALS.defaultCurrency)),
      this.form.controls.date.valueChanges
        .pipe(
          // Filter out invalid value
          filter(val => moment(GLOBALS.minDate).isSameOrBefore(val) && moment().isSameOrAfter(val)),
          // Emit start value
          startWith(moment())
        )
    ])
      .pipe(
        // Change observable to data call observable
        switchMap(([base, date]) => this.ratesService.getRates(base, moment(date).format(GLOBALS.dateFormat))
          .pipe(
            map(res =>
              // Transform response to table data
              Object.keys(res.rates)
                .map(key => ({ name: key, value: res.rates[key] }))
                .filter(item => item.name !== res.base)
                .sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
            )
          )
        )
      );
  }

}
