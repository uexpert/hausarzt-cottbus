import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeroCardComponent } from '../hero-card/hero-card.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'footer-component',
  imports: [CommonModule, HeroCardComponent, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
