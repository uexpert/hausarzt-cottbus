import { AfterViewChecked, Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { HeroCardComponent } from '../hero-card/hero-card.component';
import { WindowService } from '../../core/services/window.service';


@Component({
  selector: 'hero',
  imports: [CommonModule, HeroCardComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit, OnDestroy {
  imagesPath = environment.imagesPath;

  images = [
    'clinic/clinic-homepage-01.jpg',
    'clinic/clinic-homepage-02.jpg',
    'clinic/clinic-homepage-03.jpg'
  ];

  currentIndex = 0;
  intervalId: any;
  intervalTime = 2000;

  get transform(): string {
    return `translateX(-${this.currentIndex * 800}px)`;
  }

  ngOnInit(): void {
    this.startAutoSlide();
  }

  startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, this.intervalTime);
  }

  pause(): void {
    clearInterval(this.intervalId);
  }

  resume(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
