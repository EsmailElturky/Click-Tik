import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from '../loader/loader.service';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ToasterService } from '../../../shared/services/toaster/toaster.service';
import { LocalStorageService } from '../../../modules/auth/services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl = 'https://dummyjson.com/';

  constructor(
    private http: HttpClient,
    private router: Router,
    private loaderService: LoaderService,
    private toaster: ToasterService,
    private localStorage: LocalStorageService,
  ) {}

  get(url: string, showLoader = true): Observable<any> {
    if (showLoader) {
      this.loaderService.startLoader();
    }
    return this.http.get<any>(this.baseUrl + url).pipe(
      tap((response) => {
        if (showLoader) {
          this.loaderService.stopLoader();
        }
        return response;
      }),
      catchError((error) => {
        console.log('error');
        return this.handleHttpError(error, showLoader);
      }),
    );
  }

  post(url: string, body: {}, showLoader = true): Observable<any> {
    if (showLoader) {
      this.loaderService.startLoader();
    }
    return this.http.post<any>(this.baseUrl + url, body).pipe(
      tap((response) => {
        if (showLoader) {
          this.loaderService.stopLoader();
        }
        return response;
      }),
      catchError((error) => {
        return this.handleHttpError(error, showLoader);
      }),
    );
  }

  handleHttpError(
    error: HttpErrorResponse,
    showLoader: boolean,
  ): Observable<never> {
    console.log(error);
    if (showLoader) {
      this.loaderService.stopLoader();
    }
    const errorMessages = error.message;
    const descriptiveErrorMessages = `Error Code: ${error.status},  Message: ${error.message}`;
    if (error.status === 400) {
      if (errorMessages) {
        this.toaster.showError(
          descriptiveErrorMessages ? descriptiveErrorMessages : 'Bad Request',
        );
      } else {
        this.toaster.showError(
          descriptiveErrorMessages ? descriptiveErrorMessages : 'Server Error',
        );
      }
    } else if (error.status === 401) {
      this.localStorage.removeAllLocals();
      this.router.navigate(['/auth/login']);
    } else {
      this.toaster.showError(
        descriptiveErrorMessages ? descriptiveErrorMessages : 'Server Error',
      );
    }

    console.error(descriptiveErrorMessages);
    throw throwError(descriptiveErrorMessages);
  }
}
