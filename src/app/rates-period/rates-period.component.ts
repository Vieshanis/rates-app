import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { Observable, combineLatest, of } from 'rxjs';
import { startWith, filter, debounceTime, switchMap, map, catchError, tap } from 'rxjs/operators';
import { AllCurrencyNames } from '../shared/data';
import { GLOBALS } from '../shared/globals';
import { Rates } from '../shared/rates.model';
import { RatesPeriodService } from '../shared/services/rates-period.service';

@Component({
  selector: 'app-rates-period',
  templateUrl: './rates-period.component.html',
  styleUrls: ['./rates-period.component.scss']
})
export class RatesPeriodComponent implements OnInit {

  public rates$: Observable<Rates[]>;
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

    this.rates$ = this.form.valueChanges
      .pipe(
        debounceTime(200),
        filter(val => moment(val.endDate).isSameOrAfter(moment(val.startDate))),
        tap(val => console.log(val)),
        // Change observable to data call observable
        switchMap(val =>
          this.ratesPeriodService.getRatesPeriod(val.base, moment(val.startDate).format(GLOBALS.dateFormat), moment(val.endDate).format(GLOBALS.dateFormat))
            .pipe(
              map(res => {
                // Update table columns to exclude base rate
                this.displayedColumns = (['date'].concat(
                  AllCurrencyNames
                    .filter(item => item !== res.base)
                ));

                return Object.keys(res.rates)
                  // Sort values by date
                  .sort((a, b) => (a < b) ? 1 : ((b < a) ? -1 : 0))
                  // Transform response to table data
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
              }),
              // Handle error
              catchError(() => of([]))
            )
        )
      );
  }

}
