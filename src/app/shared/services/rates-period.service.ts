import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyHistory } from '../rates.model';

@Injectable({
  providedIn: 'any',
})
export class RatesPeriodService {
  constructor(
    private httpClient: HttpClient
  ) { }

  public getRatesPeriod(currency: string, startDate: string, endDate: string): Observable<CurrencyHistory> {
    return this.httpClient.get<CurrencyHistory>(`https://api.exchangeratesapi.io/history?start_at=${startDate}&end_at=${endDate}&base=${currency}`);
  }

}