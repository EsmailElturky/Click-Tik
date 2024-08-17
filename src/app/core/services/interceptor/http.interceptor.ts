import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../../modules/auth/services/local-storage/local-storage.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private localStorage: LocalStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const authorization = this.localStorage.getLocal('userToken');
    const headers = {
      'Content-Type': 'application/json',
    };

    if (authorization) {
      headers['Authorization'] = `Bearer ${authorization}`;
    }
    const jsonReq: HttpRequest<any> = req.clone({
      setHeaders: headers,
    });
    return next.handle(jsonReq);
  }
}
