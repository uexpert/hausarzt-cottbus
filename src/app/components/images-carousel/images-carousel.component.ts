import { Component, inject, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from '../../core/ng-zorro-antd/ng-zorro-antd.module';
import { ImagesCarouselObject } from '../../core/utils/models_interfaces';
import { WindowService } from '../../core/services/window.service';

declare var $: any; // Declare jQuery

@Component({
  selector: 'images-carousel',
  imports: [CommonModule, NgZorroAntdModule],
  templateUrl: './images-carousel.component.html',
  styleUrl: './images-carousel.component.scss'
})
export class ImagesCarouselComponent {
  @Input() imagesList: Array<ImagesCarouselObject> = [];

  ws = inject(WindowService);

  imagesPath = environment.imagesPath;


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
