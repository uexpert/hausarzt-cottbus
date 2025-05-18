import { Component } from '@angular/core';
import { ImagesCarouselComponent } from '../../components/images-carousel/images-carousel.component';
import { ImagesCarouselObject } from '../../core/utils/models_interfaces';


@Component({
  selector: 'page-about',
  imports: [ImagesCarouselComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  
  imagesList: Array<ImagesCarouselObject> = [
    { id: 1, url: 'clinic/clinic-new-01.jpg', alt: 'clinic-new-01' },
    { id: 2, url: 'clinic/clinic-new-02.jpg', alt: 'clinic-new-02' },
    { id: 3, url: 'clinic/clinic-new-03.jpg', alt: 'clinic-new-03' },
    { id: 13, url: 'clinic/clinic-new-04.jpg', alt: 'clinic-new-04' },
    { id: 4, url: 'clinic/clinic-new-05.jpg', alt: 'clinic-new-05' },
    { id: 14, url: 'clinic/clinic-new-06.jpg', alt: 'clinic-new-06' },
    { id: 15, url: 'clinic/clinic-new-07.jpg', alt: 'clinic-new-07' },
    { id: 5, url: 'clinic/clinic-new-08.jpg', alt: 'clinic-new-08' },
    { id: 6, url: 'clinic/clinic-new-09.jpg', alt: 'clinic-new-09' }
  ];

}
