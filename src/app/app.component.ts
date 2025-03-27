import { AfterViewInit, Component, inject, OnDestroy } from '@angular/core';
import { MainComponent } from './pages/main/main.component';
import { environment } from '../environments/environment';
import { WindowService } from './core/services/window.service';

declare var $: any; // Declare jQuery
declare var bootstrap: any; // Declare jQuery

@Component({
  selector: 'app-root',
  imports: [MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  observer: MutationObserver | null = null;
  ws = inject(WindowService);


  ngAfterViewInit(): void {
    this.ws.checkBreakpoints({width: window.innerWidth, height: window.innerHeight});
    setTimeout(() => {
      this.startCustomJS();
      this.waitForOwlCarousel();
    }, 500);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  startCustomJS() {
    const self = this;
    // NAVBAR
    $('.navbar-nav .nav-link').click(function(){
        $(".navbar-collapse").collapse('hide');
    });

    // REVIEWS CAROUSEL
    $('.reviews-carousel').owlCarousel({
        center: true,
        loop: true,
        nav: true,
        dots: false,
        autoplay: true,
        autoplaySpeed: 300,
        smartSpeed: 500,
        responsive:{
          0:{
            items:1,
          },
          768:{
            items:2,
            margin: 100,
          },
          1280:{
            items:2,
            margin: 100,
          }
        }
    });

    // Banner Carousel
    var myCarousel = document.querySelector('#myCarousel')
    var carousel = new bootstrap.Carousel(myCarousel, {
      interval: 1500,
    })

    // REVIEWS NAVIGATION
    function ReviewsNavResize(){
      $(".navbar").scrollspy({ offset: -94 });

      var ReviewsOwlItem = $('.reviews-carousel .owl-item').width();

      if (ReviewsOwlItem) {
        $('.reviews-carousel .owl-nav').css({'width' : (ReviewsOwlItem) + 'px'});        
      } else {
        !environment.production && console.log('Element not found or width is 0');
      }
    }

    $(window).on("resize", ReviewsNavResize);
    $(document).on("ready", ReviewsNavResize);

    // HREF LINKS
    $('a[href*="#"]').on('click', (event: Event) => {
      event.preventDefault(); // Fix: Ensure default event handling is prevented

      const targetElement = event.currentTarget as HTMLAnchorElement;
      if (!targetElement) return;

      if (
        location.pathname.replace(/^\//, '') === targetElement.pathname.replace(/^\//, '') &&
        location.hostname === targetElement.hostname
      ) {
        const target = $(targetElement.hash);
        const finalTarget = target.length ? target : $('[name=' + targetElement.hash.slice(1) + ']');
        if (finalTarget.length) {
          $('html, body').animate({
            scrollTop: finalTarget.offset().top - 74
          }, 1000);
        }
      }
    });
  }

  waitForOwlCarousel() {
    let attempts = 0;
    const maxAttempts = 10; // Retry up to 10 times

    const checkOwlCarousel = () => {
      const ReviewsOwlItem = $('.reviews-carousel .owl-item').first().width();

      if (ReviewsOwlItem) {
        this.setNavWidth(ReviewsOwlItem);
      } else if (attempts < maxAttempts) {
        attempts++;
        console.log(`Retrying (${attempts}/${maxAttempts})...`);
        setTimeout(checkOwlCarousel, 500); // Retry every 500ms
      } else {
        console.warn("Owl Carousel items were not found.");
      }
    };

    checkOwlCarousel();
  }

  setNavWidth(width: number) {
    $('.reviews-carousel .owl-nav').css({ 'width': `${width}px` });
    console.log(`.owl-nav width set to ${width}px`);
  }
}
