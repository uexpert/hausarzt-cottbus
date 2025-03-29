import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'latest-news',
  imports: [CommonModule],
  templateUrl: './latest-news.component.html',
  styleUrl: './latest-news.component.scss'
})
export class LatestNewsComponent {
  imagesPath = environment.imagesPath;

}
