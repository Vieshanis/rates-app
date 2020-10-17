import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { Observable, combineLatest } from 'rxjs';
import { startWith, filter, debounceTime, switchMap, map } from 'rxjs/operators';
import { AllCurrencyNames } from '../shared/data';
import { GLOBALS } from '../shared/globals';
import { Rates } from '../shared/rates.model';
import { RatesPeriodService } from './rates-period.service';

@Component({
  selector: 'app-rates-period',
  templateUrl: './rates-period.component.html',
  styleUrls: ['./rates-period.component.scss']
})
export class RatesPeriodComponent implements OnInit {

  public rates$: Observable<any>;
  public form: FormGroup;
  public currencyOptions = AllCurrencyNames;
  public minDate = new Date(GLOBALS.minDate);
  public maxDate = new Date();
  public displayedColumns: string[];

  constructor(
    private ratesPeriodService: RatesPeriodService,
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      base: GLOBALS.defaultCurrency,
      startDate: new Date(),
      endDate: new Date()
    });

    this.rates$ = combineLatest([
      this.form.controls.base.valueChanges
        .pipe(startWith(GLOBALS.defaultCurrency)),
      this.form.controls.startDate.valueChanges
        .pipe(
          filter(val => moment(GLOBALS.minDate).isSameOrBefore(val) && moment().isSameOrAfter(val)),
          startWith(moment())
        ),
      this.form.controls.endDate.valueChanges
        .pipe(
          filter(val => moment(GLOBALS.minDate).isSameOrBefore(val) && moment().isSameOrAfter(val)),
          startWith(moment())
        )
    ])
      .pipe(
        debounceTime(200),
        filter(([base, startDate, endDate]) => moment(endDate).isSameOrAfter(moment(startDate))),
        switchMap(([base, startDate, endDate]) =>
          this.ratesPeriodService.getRatesPeriod(base, moment(startDate).format(GLOBALS.dateFormat), moment(endDate).format(GLOBALS.dateFormat))
            .pipe(
              map(res => {
                this.displayedColumns = (['date'].concat(
                  AllCurrencyNames
                    .filter(item => item !== res.base)
                ));

                return Object.keys(res.rates)
                  .sort((a, b) => (a < b) ? 1 : ((b < a) ? -1 : 0))
                  .map(key => {
                    const rates: Rates = {
                      'date': key,
                    };
                    Object.keys(res.rates[key])
                      .sort((a, b) => (a > b) ? 1 : ((b > a) ? -1 : 0))
                      .forEach(subKey => {
                        rates[subKey] = res.rates[key][subKey];
                        if (subKey !== res.base) {
                          rates[subKey] = res.rates[key][subKey];
                        }
                      });
                    return rates;
                  });
              })
            )
        )
      );
  }

}
