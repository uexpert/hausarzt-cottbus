import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { RouterModule } from '@angular/router';
import { LatestNewsComponent } from '../../components/latest-news/latest-news.component';
import { christmasUrlaub, sommarUrlaub } from '../../core/utils/models_interfaces';

@Component({
  selector: 'page-home',
  imports: [CommonModule, HeroComponent, RouterModule, LatestNewsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  imagesPath = environment.imagesPath;
  newsList = christmasUrlaub;
  constructor() {}
  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   const sections = document.querySelectorAll('section');
  //   let activeSectionId = '';

  //   sections.forEach((section) => {
  //     const rect = section.getBoundingClientRect();
  //     if (rect.top >= 0 && rect.top <= 300) { // Detect when section is near the top
  //       activeSectionId = section.id;
  //     }
  //   });

  //   this.scrollService.setActiveSection(activeSectionId);
  // }

  
  ngOnInit(): void {
  }

}
