import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { RouterModule } from '@angular/router';
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
  private newsService = inject(NewsService);
  constructor() {}

  ngOnInit(): void {
    this.newsService.loadNotices().subscribe(() => {
      this.activeNotices = this.newsService.getActiveNotices();
    });
  }
}
