import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'latest-news',
  imports: [CommonModule],
  templateUrl: './latest-news.component.html',
  styleUrl: './latest-news.component.scss'
})
export class LatestNewsComponent implements OnInit {
  @Input() textsList: Array<string> = [];
  sanitizer = inject(DomSanitizer);
  imagesPath = environment.imagesPath;
  finalList: Array<any> = [];

  ngOnInit(): void {
    this.onInit();
  }
  
  onInit() {
    this.finalList = [];
    if (this.textsList.length) {
      this.textsList.forEach((txt: string) => {
        const item = txt ? this.sanitizer.bypassSecurityTrustHtml(txt) : '';
        this.finalList.push(item);
      });
    }
  }
}
