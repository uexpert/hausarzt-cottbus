import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { hashPassword, ADMIN_PASSWORD_HASH } from '../../../core/utils/auth.utils';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
  password = '';
  error = false;
  private router = inject(Router);

  constructor(private r: Router) {
    this.router = r;
  }

  async login() {
    const hash = await hashPassword(this.password);
    if (hash === ADMIN_PASSWORD_HASH) {
      localStorage.setItem('admin_token', hash);
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.error = true;
      this.password = '';
    }
  }
}
