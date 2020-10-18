import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { GetRatesData } from '../data';
import { RatesService } from './rates.service';

describe('RatesService', () => {
  let httpTestingController: HttpTestingController;
  let service: RatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RatesService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(RatesService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call correct API and returned Observable should match the right data', () => {
    service.getRates('EUR', '01-01-2020')
    .subscribe(res => {
      expect(res).toEqual(GetRatesData);
    });
    
    const req = httpTestingController.expectOne('https://api.exchangeratesapi.io/01-01-2020?base=EUR');
    expect(req.request.method).toEqual('GET');
    
    req.flush(GetRatesData);
  });

});
