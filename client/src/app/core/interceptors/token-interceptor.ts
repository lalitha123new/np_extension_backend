import { Inject, Injectable, Optional } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenService } from '../authentication/token.service';
import { BASE_URL } from './base-url-interceptor';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private token: TokenService,
    private router: Router,
    @Optional() @Inject(BASE_URL) private baseUrl?: string
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const logoutHandler = () => {
      if (request.url.includes('/auth/logout')) {
        this.router.navigateByUrl('/auth/login');
      }
    };

    if (this.token.valid() && this.shouldAppendToken(request.url)) {
      const jwt = this.token.headerValue();

      var pass_req = request.clone({
        setHeaders: {
          Authorization: jwt,
          'Access-Control-Allow-Headers': '*',
        },
      });

      return next.handle(pass_req);
      // .pipe(
      //   // tap(() => logoutHandler()),
      //   catchError((error: HttpErrorResponse) => {
      //     console.log("This is getting logged out " + this.token.headerValue())
      //     console.log(error);
      //     if (error.status === 401) {
      //       this.token.clear();
      //     }
      //     return throwError(error);
      //   })
      // );
    }

    return next.handle(request).pipe(tap(() => logoutHandler()));
  }

  private shouldAppendToken(url: string) {
    return !this.hasHttpScheme(url) || this.includeBaseUrl(url);
  }

  private hasHttpScheme(url: string) {
    return new RegExp('^http(s)?://', 'i').test(url);
  }

  private includeBaseUrl(url: string) {
    if (!this.baseUrl) {
      return false;
    }

    const baseUrl = this.baseUrl.replace(/\/$/, '');

    return new RegExp(`^${baseUrl}`, 'i').test(url);
  }
}
