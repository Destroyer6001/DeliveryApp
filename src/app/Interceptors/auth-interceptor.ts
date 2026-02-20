import {HttpHeaders, HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "../Services/auth-service";
import {from, switchMap} from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const publicRoutes = ['api/users/login'];

  if (publicRoutes.some(route => req.url.includes(route)))
  {
    return next(req);
  }

  const authService = inject(AuthService);

  return from (authService.GetToken()).pipe(
    switchMap(token => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      const authReq = req.clone({headers});
      return next(authReq);
    })
  );
};
