import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'company-icon',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" [style.font-size]="size">
      <path fill="currentColor" d="M0 16h8V0H0v16zM5 2h2v2H5V2zm0 4h2v2H5V6zm0 4h2v2H5v-2zM1 2h2v2H1V2zm0 4h2v2H1V6zm0 4h2v2H1v-2zm8-5h7v1H9zm0 11h2v-4h3v4h2V7H9z"/>
    </svg>
  `,
  styles: [
  ],
  standalone: false
})
export class CompanyIconComponent implements OnInit {
  @Input() size: string = '10px';

  constructor() { }

  ngOnInit(): void {
  }

}
