export interface AllCurrencies {
  base: string;
  date: string;
  rates: Rates;
}

export interface Rates {
  [key: string]: number | string;
}

export interface Rate {
  name: string;
  value: number | string;
}

export interface CurrencyHistory {
  base: string;
  end_at: string;
  start_at: string;
  rates: HistoryRates;
  ratesByDateArray?: Rates[];
}

export interface HistoryRates {
  [key: string]: Rates;
}
