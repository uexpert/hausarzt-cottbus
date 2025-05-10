import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgZorroAntdModule } from '../../core/ng-zorro-antd/ng-zorro-antd.module';
import { zoomInExpert } from '../../core/animations-lib';

@Component({
  selector: 'contact-infos',
  imports: [CommonModule, NgZorroAntdModule],
  templateUrl: './contact-infos.component.html',
  styleUrl: './contact-infos.component.scss',
  animations: [zoomInExpert]
})
export class ContactInfosComponent implements OnInit {
  @ViewChild('zoomInElement1', { static: true }) zoomInElement1: ElementRef | undefined;
  @ViewChild('zoomInElement2', { static: true }) zoomInElement2: ElementRef | undefined;
  @ViewChild('zoomInElement3', { static: true }) zoomInElement3: ElementRef | undefined;
  animateZoomInState1: string = 'hidden';
  animateZoomInState2: string = 'hidden';
  animateZoomInState3: string = 'hidden';

  ngOnInit(): void {
    this.onInterSectionInRight1();
    this.onInterSectionInRight2();
    this.onInterSectionInRight3();
  }

  
  onInterSectionInRight1() {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Add the custom fade-in-right animation class when the element is in view
            this.animateZoomInState1 = 'visible';
            observer.unobserve(entry.target);  // Stop observing after the animation triggers once
          }
        });
      },
      { threshold: 0.5 }  // The threshold is 50% of the element being in view
    );

    if (this.zoomInElement1) {
      observer.observe(this.zoomInElement1.nativeElement);
    }
  }
  onInterSectionInRight2() {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Add the custom fade-in-right animation class when the element is in view
            this.animateZoomInState2 = 'visible';
            observer.unobserve(entry.target);  // Stop observing after the animation triggers once
          }
        });
      },
      { threshold: 0.5 }  // The threshold is 50% of the element being in view
    );

    if (this.zoomInElement2) {
      observer.observe(this.zoomInElement2.nativeElement);
    }
  }
  onInterSectionInRight3() {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Add the custom fade-in-right animation class when the element is in view
            this.animateZoomInState3 = 'visible';
            observer.unobserve(entry.target);  // Stop observing after the animation triggers once
          }
        });
      },
      { threshold: 0.5 }  // The threshold is 50% of the element being in view
    );

    if (this.zoomInElement3) {
      observer.observe(this.zoomInElement3.nativeElement);
    }
  }

}
