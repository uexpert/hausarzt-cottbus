import { Directive, ElementRef, AfterViewInit } from '@angular/core';
import Hyphenopoly from 'hyphenopoly'; // No more TypeScript error

@Directive({
  selector: '[appHyphenate]'
})
export class HyphenateDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const hyphenator = Hyphenopoly.config({
      require: { de: "FORCEHYPHENOPOLY" }, // Force German hyphenation
      setup: {
        selectors: { 'p, div, h1, h2, h3, h4, h5, h6': {} } // Apply to multiple elements
      }
    });

    hyphenator.then(() => {
      Hyphenopoly.hyphenateElement(this.el.nativeElement, 'de');
    });
  }
}
