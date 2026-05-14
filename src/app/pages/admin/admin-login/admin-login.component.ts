import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
  password = '';
  errorMessage = '';
  submitting = false;

  private router   = inject(Router);
  private http     = inject(HttpClient);
  private location = inject(Location);

  login() {
    if (this.submitting) return;
    this.errorMessage = '';
    this.submitting = true;
    const url = this.location.prepareExternalUrl('api/login.php');
    this.http.post(url, { password: this.password }, { withCredentials: true }).subscribe({
      next: () => {
        this.submitting = false;
        // Clean up the stale token from the previous (client-side) auth scheme.
        localStorage.removeItem('admin_token');
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err: HttpErrorResponse) => {
        this.submitting = false;
        this.password = '';
        if (err.status === 401)      this.errorMessage = 'Falsches Passwort. Bitte erneut versuchen.';
        else if (err.status === 429) this.errorMessage = 'Zu viele Fehlversuche. Bitte einige Minuten warten.';
        else                         this.errorMessage = 'Login fehlgeschlagen. Bitte später erneut versuchen.';
      }
    });
  }
}
