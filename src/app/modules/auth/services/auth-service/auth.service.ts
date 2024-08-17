import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/services/http/http.service';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpService,
    private localStorage: LocalStorageService,
  ) {}

  signIn(body) {
    return this.http.post('auth/login', body);
  }

  get userDetails$(): Observable<any> {
    const token = this.localStorage.getLocal('userToken');
    if (!token) {
      return of(false);
    } else {
      return of(token);
    }
  }
}
