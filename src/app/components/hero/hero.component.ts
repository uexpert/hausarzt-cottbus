import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { HeroCardComponent } from '../hero-card/hero-card.component';

@Component({
  selector: 'hero',
  imports: [CommonModule, HeroCardComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  imagesPath = environment.imagesPath;
}
