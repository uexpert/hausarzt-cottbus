import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'loader-icon',
  template: `
   <svg [style.font-size]="size" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" width="1em" height="1em" overflow="visible" fill="currentColor" class="single-loader" style="" stroke="currentColor">
    <defs>
        <rect id="spinner" x="46.5" y="40" width="7" height="20" rx="2" ry="2" transform="translate(0 -30)"/>
    </defs>
    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#spinner" transform="rotate(0 50 50)">
        <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0s" repeatCount="indefinite"/>
    </use>
    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#spinner" transform="rotate(30 50 50)">
        <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.08s" repeatCount="indefinite"/>
    </use>
    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#spinner" transform="rotate(60 50 50)">
        <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.16s" repeatCount="indefinite"/>
    </use>
    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#spinner" transform="rotate(90 50 50)">
        <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.24s" repeatCount="indefinite"/>
    </use>
    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#spinner" transform="rotate(120 50 50)">
        <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.32s" repeatCount="indefinite"/>
    </use>
    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#spinner" transform="rotate(150 50 50)">
        <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.4s" repeatCount="indefinite"/>
    </use>
    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#spinner" transform="rotate(180 50 50)">
        <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.48s" repeatCount="indefinite"/>
    </use>
    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#spinner" transform="rotate(210 50 50)">
        <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.56s" repeatCount="indefinite"/>
    </use>
    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#spinner" transform="rotate(240 50 50)">
        <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.64s" repeatCount="indefinite"/>
    </use>
    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#spinner" transform="rotate(270 50 50)">
        <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.72s" repeatCount="indefinite"/>
    </use>
    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#spinner" transform="rotate(300 50 50)">
        <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.8s" repeatCount="indefinite"/>
    </use>
    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#spinner" transform="rotate(330 50 50)">
        <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.88s" repeatCount="indefinite"/>
    </use>
</svg>
  `,
  styles: [
  ],
  standalone: false
})
export class LoaderIconComponent implements OnInit {
  @Input() size!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
