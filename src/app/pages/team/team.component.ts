import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { fadeInRightExpert, fadeInLeftExpert } from '../../core/animations-lib';

@Component({
  selector: 'page-team',
  imports: [],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
  animations: [
    fadeInRightExpert, fadeInLeftExpert
  ]
})
export class TeamComponent {
  @ViewChild('fadeElementInRight', { static: true }) fadeElementInRight: ElementRef | undefined;
  @ViewChild('fadeElementInLeft', { static: true }) fadeElementInLeft: ElementRef | undefined;
  imagesPath = environment.imagesPath;
  animateInRightState: string = 'hidden';
  animateInLeftState: string = 'hidden';

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
