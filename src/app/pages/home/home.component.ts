import { Component, HostListener } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { ScrollTrackerService } from '../../core/services/scroll-tracker.service';

@Component({
  selector: 'page-home',
  imports: [CommonModule, HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  imagesPath = environment.imagesPath;
  constructor(private scrollService: ScrollTrackerService) {}
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const sections = document.querySelectorAll('section');
    let activeSectionId = '';

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top >= 0 && rect.top <= 300) { // Detect when section is near the top
        activeSectionId = section.id;
      }
    });

    this.scrollService.setActiveSection(activeSectionId);
  }

  // ngAfterViewInit() {
  //   const sections = document.querySelectorAll('section');
    
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       let activeSectionId = '';

  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           activeSectionId = entry.target.id;
  //         }
  //       });

  //       this.scrollService.setActiveSection(activeSectionId);
  //     },
  //     {
  //       threshold: 0.2, // Activate earlier (20% visibility)
  //       rootMargin: '-50px 0px -70% 0px' // Adjusts when the section is detected
  //     }
  //   );

  //   sections.forEach((section) => observer.observe(section));
  // }
}
