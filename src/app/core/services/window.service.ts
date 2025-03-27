import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  smallMobile: boolean = false; // < 360
  mobile: boolean = false; // < 576
  verticalTablet: boolean = false; // < 768
  tablet: boolean = false;  // < 992
  laptop: boolean = false;  // < 1200
  desktop: boolean = false; // < 1412


  constructor() {
    // this.checkBreakpoints({width: this.window.innerWidth, height: this.window.innerHeight});
    // this.logAllBreakpoints({width: this.window.innerWidth, height: this.window.innerHeight});
    
    fromEvent(window, 'resize').pipe(
      // tslint:disable-next-line: no-angle-bracket-type-assertion
      map((event: any) => <any>{
        // tslint:disable-next-line: no-string-literal
        width: event['currentTarget'].innerWidth,
        // tslint:disable-next-line: no-string-literal
        height: event['currentTarget'].innerHeight
      }))
      .subscribe((windowSize: {width: number, height: number}) => {
        this.windowSizeChanged.next(windowSize);
        this.checkBreakpoints(windowSize);
        // this.logAllBreakpoints(windowSize);
      });

  }

  readonly windowSizeChanged = new BehaviorSubject<{width: number, height: number}>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  logAllBreakpoints(windowSize: any) {
    console.log(`%c width: `, 'color: red', windowSize.width);
    console.log(`%c sMobile: `, 'color: red', this.smallMobile);
    console.log(`%c mobile: `, 'color: red', this.mobile);
    console.log(`%c verticalTablet: `, 'color: red', this.verticalTablet);
    console.log(`%c tablet: `, 'color: red', this.tablet);
    console.log(`%c laptop: `, 'color: red', this.laptop);
    console.log(`%c desktop: `, 'color: red', this.desktop);
  }

  checkBreakpoints(windowSize: {width: number, height: number}) {
    this.setAllBreakpoints(false);
    if (windowSize.width < 360) {
      this.smallMobile = true;
    }
    if (windowSize.width < 576) {
      this.mobile = true;
    }
    if (windowSize.width < 768) {
      this.verticalTablet = true;
    }
    if (windowSize.width < 992) {
      this.tablet = true;
    }
    if (windowSize.width < 1200) {
      this.laptop = true;
    }
    if (windowSize.width < 1412) {
      this.desktop = true;
    }
    // this.smallMobile = windowSize.width < 360;
    // this.mobile = windowSize.width < 576;
    // this.verticalTablet = ws.verticalTablet;
    // this.tablet = windowSize.width < 992;
    // this.largeTablet = windowSize.width < 1200;
    // this.laptop = windowSize.width < 1412;
    // this.desktop = windowSize.width >= 1412;
  }

  setAllBreakpoints(newValue: boolean) {
    this.smallMobile = newValue;
    this.mobile = newValue;
    this.verticalTablet = newValue;
    this.tablet = newValue;
    this.laptop = newValue;
    this.desktop = newValue;
  }


}
