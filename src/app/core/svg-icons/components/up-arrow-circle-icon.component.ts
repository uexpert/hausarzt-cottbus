import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'up-arrow-circle-icon',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" [style.font-size]="size">
        <path fill="currentColor" d="M13 18h-2v-8l-3.5 3.5l-1.42-1.42L12 6.16l5.92 5.92l-1.42 1.42L13 10v8M12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8a8 8 0 0 0 8 8a8 8 0 0 0 8-8a8 8 0 0 0-8-8Z"></path>
    </svg>
  `,
  styles: [
  ],
  standalone: false
})
export class UpArrowCircleIconComponent implements OnInit {
  @Input() size!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
