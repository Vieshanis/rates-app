import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { GetRatesPeriodData } from '../data';
import { RatesPeriodService } from './rates-period.service';

describe('RatesPeriodService', () => {
  let httpTestingController: HttpTestingController;
  let service: RatesPeriodService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RatesPeriodService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(RatesPeriodService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call correct API and returned Observable should match the right data', () => {
    service.getRatesPeriod('EUR', '01-01-2020', '03-01-2020')
      .subscribe(res => {
        expect(res).toEqual(GetRatesPeriodData);
      });

    const req = httpTestingController.expectOne('https://api.exchangeratesapi.io/history?start_at=01-01-2020&end_at=03-01-2020&base=EUR');
    expect(req.request.method).toEqual('GET');

    req.flush(GetRatesPeriodData);
  });

});
