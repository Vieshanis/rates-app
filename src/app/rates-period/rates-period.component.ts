import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { Observable, combineLatest } from 'rxjs';
import { startWith, filter, debounceTime, switchMap, map } from 'rxjs/operators';
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

    this.rates$ = combineLatest([
      this.form.controls.base.valueChanges
        // Emit start value
        .pipe(startWith(GLOBALS.defaultCurrency)),
      combineLatest([
        this.form.controls.startDate.valueChanges
          .pipe(
            // Filter out invalid values
            filter(val => moment(GLOBALS.minDate).isSameOrBefore(val) && moment().isSameOrAfter(val))
          ),
        this.form.controls.endDate.valueChanges
          .pipe(
            // Filter out invalid values
            filter(val => moment(GLOBALS.minDate).isSameOrBefore(val) && moment().isSameOrAfter(val))
          ),
      ])
        .pipe(
          // Delay emit to prevent unnecesary calls
          debounceTime(200),
          // Filter out invalid values
          filter(([startDate, endDate]) => moment(endDate).isSameOrAfter(moment(startDate)))
        )
    ])
      .pipe(
        // Change observable to data call observable
        switchMap(([base, range]) =>
          this.ratesPeriodService.getRatesPeriod(base, moment(range[0]).format(GLOBALS.dateFormat), moment(range[1]).format(GLOBALS.dateFormat))
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
              })
            )
        )
      );
  }

}
