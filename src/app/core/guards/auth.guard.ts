import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { catchError, map, of } from 'rxjs';

/**
 * Probes /api/whoami.php with credentials. The server validates the
 * HttpOnly hac_session cookie against its session store; a 200 means the
 * session is fresh, anything else redirects to the login page.
 */
export const authGuard: CanActivateFn = () => {
  const router   = inject(Router);
  const http     = inject(HttpClient);
  const location = inject(Location);

  const url = location.prepareExternalUrl('api/whoami.php');
  return http.get(url, { withCredentials: true }).pipe(
    map(() => true),
    catchError(() => of(router.createUrlTree(['/admin/login'])))
  );
};
