import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'spinner-adc-logo-icon',
  templateUrl: './spinner-adc-logo-icon.component.html',
  styles: [
    `
      .spinner-circle {
          transform-origin: center;
          animation: rotate 1.5s linear infinite;
      }

      @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
      }


    `
  ],
  standalone: false
})
export class SpinnerADCLogoIconComponent implements OnInit {
  @Input() circleColor: string = 'red';
  @Input() logoColor: string = 'red';
  @Input() circleThickness: number = 4;
  imagesPath = environment.imagesPath + 'adc-logo.svg';
  constructor() { }

  ngOnInit(): void {
  }

}
