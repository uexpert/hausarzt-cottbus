import { Injectable, inject } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NewsNotice } from '../utils/news.model';

const STORAGE_KEY = 'hausarzt_news';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private http = inject(HttpClient);
  // prepareExternalUrl() prepends <base href>, so URLs work under both root
  // deployments ("/") and sub-folder deployments ("/hausarzt-cottbus/").
  private location = inject(Location);

  private notices$ = new BehaviorSubject<NewsNotice[]>([]);

  loadNotices(): Observable<NewsNotice[]> {
    // Always fetch fresh from news.json (cache-busted). Public read, no auth.
    const url = this.location.prepareExternalUrl(`data/news.json?v=${Date.now()}`);
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

  getNoticesSnapshot(): NewsNotice[] {
    return this.notices$.getValue();
  }

  /** Look up a notice by ID across the full set, ignoring isActive and date range. */
  getNoticeById(id: string): NewsNotice | null {
    return this.notices$.getValue().find(n => n.id === id) ?? null;
  }

  getActiveNotice(): NewsNotice | null {
    return this.getActiveNotices()[0] ?? null;
  }

  /** Returns ALL notices that are active and whose end date has not yet passed. */
  getActiveNotices(): NewsNotice[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.notices$.getValue().filter(notice => {
      if (!notice.isActive) return false;
      const end = new Date(notice.endDate);
      end.setHours(23, 59, 59, 999);
      return today <= end;
    });
  }

  saveNotices(notices: NewsNotice[]): Observable<any> {
    this.notices$.next(notices);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notices));
    // withCredentials sends the HttpOnly hac_session cookie set by login.php.
    return this.http.post(
      this.location.prepareExternalUrl('api/save-news.php'),
      notices,
      { withCredentials: true }
    );
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
