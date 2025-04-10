import { Component } from '@angular/core';
import { ImagesCarouselComponent } from '../../components/images-carousel/images-carousel.component';


@Component({
  selector: 'page-about',
  imports: [ImagesCarouselComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
