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
    { id: 1, url: 'clinic/clinic-01.jpg', alt: 'clinic-01' },
    { id: 2, url: 'clinic/clinic-02.jpg', alt: 'clinic-02' },
    { id: 3, url: 'clinic/clinic-03.jpg', alt: 'clinic-03' },
    { id: 13, url: 'clinic/clinic-04.jpg', alt: 'clinic-04' },
    { id: 4, url: 'clinic/clinic-05.jpg', alt: 'clinic-05' },
    { id: 14, url: 'clinic/clinic-06.jpg', alt: 'clinic-06' },
    { id: 15, url: 'clinic/clinic-07.jpg', alt: 'clinic-07' },
    { id: 5, url: 'clinic/clinic-08.jpg', alt: 'clinic-08' },
    { id: 6, url: 'clinic/clinic-09.jpg', alt: 'clinic-09' },
    { id: 7, url: 'clinic/clinic-10.jpg', alt: 'clinic-10' },
    { id: 8, url: 'clinic/clinic-11.jpg', alt: 'clinic-11' },
    { id: 9, url: 'clinic/clinic-12.jpg', alt: 'clinic-12' },
    { id: 10, url: 'clinic/clinic-13.jpg', alt: 'clinic-13' },
    { id: 11, url: 'clinic/clinic-14.jpg', alt: 'clinic-14' },
    { id: 12, url: 'clinic/clinic-15.jpg', alt: 'clinic-15' }
  ];

}
