import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from '../../core/ng-zorro-antd/ng-zorro-antd.module';
declare var $: any; // Declare jQuery

@Component({
  selector: 'images-carousel',
  imports: [CommonModule, NgZorroAntdModule],
  templateUrl: './images-carousel.component.html',
  styleUrl: './images-carousel.component.scss'
})
export class ImagesCarouselComponent {
  imagesPath = environment.imagesPath;
  images = [
    { id: 1, src: this.imagesPath + 'clinic/clinic-01.jpeg', alt: 'clinic-01' },
    { id: 2, src: 'https://picsum.photos/id/1015/1000/600/', alt: 'Image 2' },
    { id: 3, src: 'https://picsum.photos/id/1019/1000/600/', alt: 'Image 3' },
    { id: 4, src: 'https://picsum.photos/id/1020/1000/600/', alt: 'Image 4' }
  ];


  ngAfterViewInit(): void {
    setTimeout(() => {
      this.startCustomJS();
    }, 200);
  }

  startCustomJS() {
    var owl = $('.owl-carousel');
    owl.owlCarousel({
        items:3,
        loop:true,
        margin:10,
        autoplay:true,
        autoplayTimeout:2000,
        autoplayHoverPause:true
    });
  }


}
