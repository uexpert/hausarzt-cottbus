import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { RouterModule } from '@angular/router';
import { fadeInRightExpert, fadeInLeftExpert } from '../../core/animations-lib';
import { LatestNewsComponent } from '../../components/latest-news/latest-news.component';

@Component({
  selector: 'page-home',
  imports: [CommonModule, HeroComponent, RouterModule, LatestNewsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    fadeInRightExpert, fadeInLeftExpert
  ]
})
export class HomeComponent implements OnInit {
  @ViewChild('fadeElementInRight', { static: true }) fadeElementInRight: ElementRef | undefined;
  @ViewChild('fadeElementInLeft', { static: true }) fadeElementInLeft: ElementRef | undefined;
  imagesPath = environment.imagesPath;
  animateInRightState: string = 'hidden';
  animateInLeftState: string = 'hidden';
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
    this.onInterSectionInRight();
    this.onInterSectionInLeft();
  }

  onInterSectionInRight() {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Add the custom fade-in-right animation class when the element is in view
            this.animateInRightState = 'visible';
            observer.unobserve(entry.target);  // Stop observing after the animation triggers once
          }
        });
      },
      { threshold: 0.5 }  // The threshold is 50% of the element being in view
    );

    if (this.fadeElementInRight) {
      observer.observe(this.fadeElementInRight.nativeElement);
    }
  }

  onInterSectionInLeft() {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Add the custom fade-in-right animation class when the element is in view
            this.animateInLeftState = 'visible';
            observer.unobserve(entry.target);  // Stop observing after the animation triggers once
          }
        });
      },
      { threshold: 0.5 }  // The threshold is 50% of the element being in view
    );

    if (this.fadeElementInLeft) {
      observer.observe(this.fadeElementInLeft.nativeElement);
    }
  }
}
