import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../Services/auth-service";

export const authGuard: CanActivateFn = async (route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = await auth.IsLoggedIn();

  if (!isAuthenticated)
  {
    return router.createUrlTree([''])
  }

  return true;
}
