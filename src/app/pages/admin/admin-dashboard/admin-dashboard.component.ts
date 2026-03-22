import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NewsService } from '../../../core/services/news.service';
import { NewsNotice } from '../../../core/utils/news.model';
import { LatestNewsComponent } from '../../../components/latest-news/latest-news.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, LatestNewsComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  private newsService = inject(NewsService);
  private router = inject(Router);

  notices: NewsNotice[] = [];
  showForm = false;
  isEditing = false;
  showPreview = false;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error' = 'idle';

  currentNotice: NewsNotice = this.emptyNotice();
  previewList: string[] = [];

  ngOnInit() {
    this.newsService.loadNotices().subscribe({
      next: (notices) => this.notices = notices,
      error: () => this.notices = []
    });
  }

  emptyNotice(): NewsNotice {
    const today = new Date().toISOString().split('T')[0];
    return {
      id: Date.now().toString(),
      title: '',
      content: [''],
      startDate: today,
      endDate: today,
      isActive: true,
      createdAt: new Date().toISOString()
    };
  }

  openCreateForm() {
    this.currentNotice = this.emptyNotice();
    this.isEditing = false;
    this.showForm = true;
    this.showPreview = false;
  }

  openEditForm(notice: NewsNotice) {
    this.currentNotice = { ...notice, content: [...notice.content] };
    this.isEditing = true;
    this.showForm = true;
    this.showPreview = false;
  }

  cancelForm() {
    this.showForm = false;
    this.showPreview = false;
  }

  addContentLine() {
    this.currentNotice.content.push('');
  }

  removeContentLine(index: number) {
    if (this.currentNotice.content.length > 1) {
      this.currentNotice.content.splice(index, 1);
    }
  }

  trackByIndex(index: number): number {
    return index;
  }

  updateContentLine(index: number, value: string) {
    this.currentNotice.content[index] = value;
  }

  preview() {
    this.previewList = [...this.currentNotice.content];
    this.showPreview = true;
  }

  saveNotice() {
    if (!this.currentNotice.title.trim()) return;
    const filtered = this.currentNotice.content.filter(c => c.trim() !== '');
    if (!filtered.length) return;
    this.currentNotice.content = filtered;

    if (this.isEditing) {
      this.newsService.updateNotice(this.currentNotice);
    } else {
      this.newsService.addNotice(this.currentNotice);
    }

    this.newsService.getNotices().subscribe(n => this.notices = n);
    this.showForm = false;
    this.showPreview = false;
    this.persistToServer();
  }

  deleteNotice(id: string) {
    if (!confirm('Möchten Sie diese Meldung wirklich löschen?')) return;
    this.newsService.deleteNotice(id);
    this.newsService.getNotices().subscribe(n => this.notices = n);
    this.persistToServer();
  }

  toggleActive(notice: NewsNotice) {
    const updated = { ...notice, isActive: !notice.isActive };
    this.newsService.updateNotice(updated);
    this.newsService.getNotices().subscribe(n => this.notices = n);
    this.persistToServer();
  }

  persistToServer() {
    this.saveStatus = 'saving';
    this.newsService.getNotices().subscribe(notices => {
      this.newsService.saveNotices(notices).subscribe({
        next: () => {
          this.saveStatus = 'saved';
          setTimeout(() => this.saveStatus = 'idle', 3000);
        },
        error: () => {
          this.saveStatus = 'error';
          setTimeout(() => this.saveStatus = 'idle', 4000);
        }
      });
    });
  }

  isCurrentlyActive(notice: NewsNotice): boolean {
    if (!notice.isActive) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(notice.startDate);
    const end = new Date(notice.endDate);
    end.setHours(23, 59, 59, 999);
    return today >= start && today <= end;
  }

  logout() {
    localStorage.removeItem('admin_token');
    this.router.navigate(['/admin/login']);
  }
}
