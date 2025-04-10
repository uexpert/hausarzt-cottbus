import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fill-check-circle-icon',
  template: `
    <svg [style.font-size]="size" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
      <path fill="currentColor" d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"></path>
    </svg>
  `,
  styles: [
  ],
  standalone: false
})
export class FillCheckCircleIconComponent implements OnInit {
  @Input() size!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
