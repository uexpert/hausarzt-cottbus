import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'container-icon',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" viewBox="0 0 37 37">
        <defs>
          <mask id="hole">
            <rect width="100%" height="100%" fill="white"/>
            <circle r="4" cx="16" cy="3" fill="black"/>
          </mask>
        </defs>
        <rect width="37" height="37" rx="6" [ngStyle]="{'fill': fill1, 'opacity': opacity1}"/>
        <g transform="translate(10.15 10.956)" mask="url(#hole)" *ngIf="!condition1; else template1">
            <path d="M.835-2.122H5.868c1.2-.027,1.023,1.854,2.216,1.849h7.78A.926.926,0,0,1,16.7.649V11a.853.853,0,0,1-.835.843H.835A.858.858,0,0,1,0,10.973V-.746A1.555,1.555,0,0,1,.835-2.122Z" transform="translate(0 2.122)" fill="currentColor" stroke="currentColor" stroke-width="1"/>
        </g>
        <ng-template #template1>
            <g transform="translate(10.15 10.956)">
                <path d="M.835-2.122H5.868c1.2-.027,1.023,1.854,2.216,1.849h7.78A.926.926,0,0,1,16.7.649V11a.853.853,0,0,1-.835.843H.835A.858.858,0,0,1,0,10.973V-.746A1.555,1.555,0,0,1,.835-2.122Z" transform="translate(0 2.122)" fill="currentColor" stroke="currentColor" stroke-width="1"/>
            </g>
        </ng-template>
        <circle r="3" cx="26.5" cy="13.5" *ngIf="!condition1" [ngStyle]="{'fill': fill2}"/>
        <g *ngIf="condition2" style="transform: translate(10px, 14px) scale(0.5); color: whitesmoke; opacity: 0.8;">
            <path fill="currentColor" d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0a4.125 4.125 0 0 1-8.25 0Zm9.75 2.25a3.375 3.375 0 1 1 6.75 0a3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63a13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122Zm15.75.003l-.001.144a2.25 2.25 0 0 1-.233.96a10.088 10.088 0 0 0 5.06-1.01a.75.75 0 0 0 .42-.643a4.875 4.875 0 0 0-6.957-4.611a8.586 8.586 0 0 1 1.71 5.157v.003Z"></path>
        </g>
    </svg> 
  `,
  styles: [
  ],
  standalone: false
})
export class ContainerIconComponent implements OnInit {
  @Input() condition1!: any;
  @Input() condition2!: any;
  @Input() fill1: string = 'white';
  @Input() fill2: string = 'white';
  @Input() opacity1!: any;

  constructor() { }

  ngOnInit(): void {
  }

}
