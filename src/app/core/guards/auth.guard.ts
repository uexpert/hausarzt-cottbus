import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('admin_token') === 'hausarzt_admin_2024';
  if (!isLoggedIn) {
    router.navigate(['/admin/login']);
    return false;
  }
  return true;
};
