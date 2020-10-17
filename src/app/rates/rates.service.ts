import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllCurrencies } from '../shared/rates.model';

@Injectable({
  providedIn: 'any',
})
export class RatesService {
  constructor(
    private httpClient: HttpClient
  ) { }

  public getRates(currency: string, date: string): Observable<AllCurrencies> {
    return this.httpClient.get<AllCurrencies>(`https://api.exchangeratesapi.io/${date}?base=${currency}`);
  }

}