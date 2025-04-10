import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'meet-video-cam-icon',
  template: `
    <svg [style.font-size]="size" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <mask id="hole">
          <rect width="100%" height="100%" fill="white"></rect>
          <circle r="120" cx="50" cy="120" fill="black"></circle>
        </mask>
      </defs>
      
      <ng-container *ngIf="record; else normalCamera">
        <g transform="translate(10.15 10.956)" mask="url(#hole)">
          <path d="M464 384.39a32 32 0 01-13-2.77 15.77 15.77 0 01-2.71-1.54l-82.71-58.22A32 32 0 01352 295.7v-79.4a32 32 0 0113.58-26.16l82.71-58.22a15.77 15.77 0 012.71-1.54 32 32 0 0145 29.24v192.76a32 32 0 01-32 32zM268 400H84a68.07 68.07 0 01-68-68V180a68.07 68.07 0 0168-68h184.48A67.6 67.6 0 01336 179.52V332a68.07 68.07 0 01-68 68z"></path>
        </g>
        <circle r="70" cx="70" cy="145" [ngStyle]="{fill: redCircleColor}" class="opacity-toggle"></circle>
      </ng-container>
      <ng-template #normalCamera>
        <g transform="translate(10.15 10.956)">
          <path d="M464 384.39a32 32 0 01-13-2.77 15.77 15.77 0 01-2.71-1.54l-82.71-58.22A32 32 0 01352 295.7v-79.4a32 32 0 0113.58-26.16l82.71-58.22a15.77 15.77 0 012.71-1.54 32 32 0 0145 29.24v192.76a32 32 0 01-32 32zM268 400H84a68.07 68.07 0 01-68-68V180a68.07 68.07 0 0168-68h184.48A67.6 67.6 0 01336 179.52V332a68.07 68.07 0 01-68 68z"></path>
        </g>
      </ng-template>
    </svg>
  `,
  styles: [
    `
      @keyframes opacityToggle {
          from { opacity: 0.1 }
          to { opacity: 1 }
      }
      
      .opacity-toggle {
          animation: opacityToggle 0.7s ease-in-out 0s infinite alternate;
      }
    `
  ],
  standalone: false
})
export class MeetVideoCamIconComponent implements OnInit {
  @Input() record: any = false;
  @Input() redCircleColor: string = '#ED4444';
  @Input() size!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
