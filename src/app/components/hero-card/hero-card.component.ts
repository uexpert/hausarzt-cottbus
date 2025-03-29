import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { WindowService } from '../../core/services/window.service';

@Component({
  selector: 'hero-card',
  imports: [CommonModule],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss'
})
export class HeroCardComponent {
  @Input() inline: boolean = false;
  ws = inject(WindowService);
  
}
