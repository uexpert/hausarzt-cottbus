import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LatestNewsComponent } from '../../components/latest-news/latest-news.component';
import { NewsService } from '../../core/services/news.service';
import { NewsNotice } from '../../core/utils/news.model';

@Component({
  selector: 'page-home',
  imports: [CommonModule, HeroComponent, RouterModule, LatestNewsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  imagesPath = environment.imagesPath;
  activeNotices: NewsNotice[] = [];
  previewMode = false;
  previewMissing = false;
  private newsService = inject(NewsService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.newsService.loadNotices().subscribe(() => this.applyPreviewOrActive());
    this.route.queryParamMap.subscribe(() => this.applyPreviewOrActive());
  }

  private applyPreviewOrActive(): void {
    const previewId = this.route.snapshot.queryParamMap.get('preview');
    if (previewId) {
      const notice = this.newsService.getNoticeById(previewId);
      this.previewMode = true;
      this.previewMissing = !notice;
      this.activeNotices = notice ? [notice] : [];
    } else {
      this.previewMode = false;
      this.previewMissing = false;
      this.activeNotices = this.newsService.getActiveNotices();
    }
  }
}
