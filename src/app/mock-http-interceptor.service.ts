import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {delay} from "rxjs/operators";

import data from '../data.json';

@Injectable()
export class MockHttpInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const {method} = request;
    if (method === "GET") {
      return of(new HttpResponse({status: 200, body: data})).pipe(delay(250));
    }
  }
}
