import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hause-icon',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 7.764 7.247" [style.font-size]="size">
        <g id="home" transform="translate(-16 -32)">
            <path id="Pfad_957" data-name="Pfad 957"
                d="M67.1,99.1a.129.129,0,0,0-.179,0l-2.978,2.845a.129.129,0,0,0-.04.094v2.67a.518.518,0,0,0,.518.518h1.554a.259.259,0,0,0,.259-.259v-2.2a.129.129,0,0,1,.129-.129h1.294a.129.129,0,0,1,.129.129v2.2a.259.259,0,0,0,.259.259H69.6a.518.518,0,0,0,.518-.518v-2.67a.129.129,0,0,0-.04-.094Z"
                transform="translate(-47.126 -65.976)" fill="currentColor"></path>
            <path id="Pfad_958" data-name="Pfad 958"
                d="M23.681,35.432l-1.21-1.157V32.518a.259.259,0,0,0-.259-.259h-.776a.259.259,0,0,0-.259.259v.518l-.937-.9a.53.53,0,0,0-.717,0l-3.44,3.292a.264.264,0,0,0-.022.362.259.259,0,0,0,.375.017L19.793,32.6a.129.129,0,0,1,.179,0l3.357,3.207a.259.259,0,0,0,.365-.007A.265.265,0,0,0,23.681,35.432Z"
                transform="translate(0)" fill="currentColor"></path>
        </g>
    </svg>
  `,
  styles: [
  ],
  standalone: false
})
export class HauseIconComponent implements OnInit {
  @Input() size: string = '10px';
  constructor() { }

  ngOnInit(): void {
  }

}
