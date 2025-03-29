import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeroCardComponent } from '../hero-card/hero-card.component';

@Component({
  selector: 'footer-component',
  imports: [CommonModule, HeroCardComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
