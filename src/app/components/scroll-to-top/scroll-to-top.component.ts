import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css'],
  standalone: true
})
export class ScrollToTopComponent {
  isVisible: boolean = false;

  // Listen to window scroll
  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.isVisible = window.scrollY > 100; // Show button if scrolled down 100px
  }

  // Scroll to top function
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
