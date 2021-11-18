import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '@core/authentication/token.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PendingCasesService {
  pendingInfo: BehaviorSubject<any> = new BehaviorSubject<any>({
    assetId: 150248,
    biopsy: 'Multiple Biopsies',
    created: 'helo created4',
    currentState: 1,
    done: 1,
    em: 0,
    fixative: '10% Formalin',
    ncs: 0,
    nextState: 2,
    npBase: '65/21:A',
    npNumber: 'X6458/19',
    patientName: 'ddd',
    process_all: 0,
    process_more: 0,
    quantity: 0,
    request_id: 0,
    review: '',
    special: 0,
    specimen: 'Surgical Biopsy',
    start_time: '30-11-2019, 15:46',
    type: 1,
    type_id: 28821,
  });
  constructor(private httpclient: HttpClient, private token: TokenService) {}

  headers = new HttpHeaders({
    Authorization: this.token.headerValue(),
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Headers': '*',
  });

  getCharts(
    startTat: number[],
    endTat: number[],
    type: String,
    parity: String
  ): Observable<number[]> {
    if (type === 'all' && parity === 'all') {
      {
        return this.httpclient.get<number[]>(
          `http://localhost:8080/api/dashboard/pending/chart/${startTat}/${endTat}`,
          { headers: this.headers }
        );
      }
    } else if (type !== 'all' && parity === 'all') {
      return this.httpclient.get<number[]>(
        `http://localhost:8080/api/dashboard/pending/chart/${type}/${startTat}/${endTat}`,
        { headers: this.headers }
      );
    } else if (type !== 'all' && parity !== 'all') {
      return this.httpclient.get<number[]>(
        `http://localhost:8080/api/dashboard/pending/chart/${type}/${parity}/${startTat}/${endTat}`,
        { headers: this.headers }
      );
    }
  }

  getCases(type: String, parity: String): Observable<any[]> {
    if (type === 'all' && parity === 'all') {
      return this.httpclient.get<any[]>(
        'http://localhost:8080/api/dashboard/pending',
        { headers: this.headers }
      );
    } else if (type !== 'all' && parity === 'all') {
      return this.httpclient.get<any[]>(
        `http://localhost:8080/api/dashboard/pending/${type}`,
        { headers: this.headers }
      );
    } else if (type !== 'all' && parity !== 'all') {
      return this.httpclient.get<any[]>(
        `http://localhost:8080/api/dashboard/pending/${type}/${parity}`,
        { headers: this.headers }
      );
    }
  }

  getPendingCaseInfo(npNum: String): Observable<any> {
    return this.httpclient.get<any>(
      `http://10.11.3.3:8080/Sample_Tracker/webapi/${npNum}`,
      { headers: this.headers }
    );
  }

  npNo: Subject<String> = new Subject<String>();
  pendingCaseRanges: Subject<any[]> = new Subject<any[]>();
  type: Subject<any> = new Subject<any>();
  parity: Subject<any> = new Subject<any>();
}
