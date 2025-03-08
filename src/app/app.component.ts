import { AfterViewInit, Component } from '@angular/core';
import { MainComponent } from './pages/main/main.component';

declare var $: any; // Declare jQuery
declare var bootstrap: any; // Declare jQuery

@Component({
  selector: 'app-root',
  imports: [MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.startCustomJS();
  }

  startCustomJS() {
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

      $('.reviews-carousel .owl-nav').css({'width' : (ReviewsOwlItem) + 'px'});
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
}
