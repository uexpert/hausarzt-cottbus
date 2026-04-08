import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ADMIN_PASSWORD_HASH } from '../utils/auth.utils';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('admin_token') === ADMIN_PASSWORD_HASH;
  if (!isLoggedIn) {
    router.navigate(['/admin/login']);
    return false;
  }
  return true;
};
