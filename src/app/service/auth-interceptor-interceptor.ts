import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from './auth';
import { tap } from 'rxjs';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);

  return next(req).pipe(
    tap({
      error: (err: HttpErrorResponse) => {
        if (err.status === 401 && err.url && err.url.includes('api/get-authenticated-user')
          && authService.isAuthenticated()) {
          authService.login();
        } else if (err.url && ((req.method !== 'GET' && !err.url.endsWith('/api/songs'))
          || (err.url && !err.url.endsWith('api/get-authenticated-user')) && !authService.isAuthenticated())) {
          authService.openOrCloseAuthPopup("OPEN");
        }
      }
    })
  );
};
