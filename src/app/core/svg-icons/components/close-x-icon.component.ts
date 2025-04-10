import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'close-x-icon',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24">
        <path fill="currentColor" d="M15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z">
        </path>
    </svg>
  `,
  styles: [
  ],
  standalone: false
})
export class CloseXIconComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
