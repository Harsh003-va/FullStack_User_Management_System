import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationServiceService } from '../authentication-service.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthenticationServiceService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.isAuthenticationTokenAvailable();
    if (token) {
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: token,
        },
      });
      return next.handle(clonedReq);
    }
    return next.handle(req);
  }
}
