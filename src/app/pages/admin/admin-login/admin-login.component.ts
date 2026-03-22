import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  login() {
    if (this.password === 'hausarzt_admin_2024') {
      localStorage.setItem('admin_token', 'hausarzt_admin_2024');
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.error = true;
      this.password = '';
    }
  }
}
