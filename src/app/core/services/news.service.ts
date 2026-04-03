import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NewsNotice } from '../utils/news.model';

const API_SECRET = 'hac_news_secret_2024_xK9mP';
const STORAGE_KEY = 'hausarzt_news';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private http = inject(HttpClient);
  private notices$ = new BehaviorSubject<NewsNotice[]>([]);

  loadNotices(): Observable<NewsNotice[]> {
    // Always fetch fresh from news.json (cache-busted)
    const url = `/data/news.json?v=${Date.now()}`;
    return this.http.get<NewsNotice[]>(url).pipe(
      tap(notices => {
        this.notices$.next(notices);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notices));
      })
    );
  }

  getNotices(): Observable<NewsNotice[]> {
    return this.notices$.asObservable();
  }

  getActiveNotice(): NewsNotice | null {
    return this.getActiveNotices()[0] ?? null;
  }

  /** Returns ALL notices that are currently active (isActive + within date range). */
  getActiveNotices(): NewsNotice[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.notices$.getValue().filter(notice => {
      if (!notice.isActive) return false;
      const start = new Date(notice.startDate);
      const end   = new Date(notice.endDate);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      return today >= start && today <= end;
    });
  }

  saveNotices(notices: NewsNotice[]): Observable<any> {
    this.notices$.next(notices);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notices));
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-Key': API_SECRET
    });
    return this.http.post('/api/save-news.php', notices, { headers });
  }

  addNotice(notice: NewsNotice): void {
    const current = this.notices$.getValue();
    this.notices$.next([...current, notice]);
  }

  updateNotice(updated: NewsNotice): void {
    const current = this.notices$.getValue();
    this.notices$.next(current.map(n => n.id === updated.id ? updated : n));
  }

  deleteNotice(id: string): void {
    const current = this.notices$.getValue();
    this.notices$.next(current.filter(n => n.id !== id));
  }
}
