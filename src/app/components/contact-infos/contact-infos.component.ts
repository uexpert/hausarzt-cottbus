import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Sanitizer, ViewChild, ViewChildren } from '@angular/core';
import { NgZorroAntdModule } from '../../core/ng-zorro-antd/ng-zorro-antd.module';
import { zoomInExpert } from '../../core/animations-lib';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'contact-infos',
  imports: [CommonModule, NgZorroAntdModule],
  templateUrl: './contact-infos.component.html',
  styleUrl: './contact-infos.component.scss',
  animations: [zoomInExpert]
})
export class ContactInfosComponent implements OnInit, AfterViewInit {
  @ViewChildren('zoomInElement') zoomInElementList: QueryList<ElementRef> | undefined;
  elementsList: any = [];
  list: any = [];

  constructor (private san: DomSanitizer) {

  }

  ngOnInit(): void {
    this.setList();
  }
  
  
  ngAfterViewInit() {
    if (this.zoomInElementList) {
        this.elementsList = this.zoomInElementList.toArray();
        if (this.elementsList?.length) {
          this.elementsList.forEach((element: any, index: number) => {
            this.onInterSectionInRight(element, index);
          });
        }
    }
  }

  setList() {
    this.list = [
    {
      id: 1,
      delay: '200ms',
      value: 'hidden',
      label: 'Adressdaten',
      data: this.san.bypassSecurityTrustHtml('Arztpraxis Dr. Gabriel Chosnis<br/>Ärztehaus Nord<br/>G.-Hauptmann-Str. 15<br/>03044 Cottbus'),
      icon: this.san.bypassSecurityTrustHtml('<nz-icon nzType="environment" nzTheme="outline" />')
    },
    {
      id: 2,
      delay: '500ms',
      value: 'hidden',
      label: 'Mail',
      data: `<a class="x-link" href="mailto:kontakt@arztpraxis-chosnis.de">kontakt@arztpraxis-chosnis.de</a>`,
      icon: this.san.bypassSecurityTrustHtml('<nz-icon nzType="environment" nzTheme="outline" />')
    },
    {
      id: 3,
      delay: '800ms',
      value: 'hidden',
      label: 'Telefonnummer',
      data: '0355 - 822006',
      icon: this.san.bypassSecurityTrustHtml('<nz-icon nzType="environment" nzTheme="outline" />')
    }
  ];
  }
  
  onInterSectionInRight(element: any, index: number) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Add the custom fade-in-right animation class when the element is in view
            this.list[index].value = 'visible';
            observer.unobserve(entry.target);  // Stop observing after the animation triggers once
          }
        });
      },
      { threshold: 0.5 }  // The threshold is 50% of the element being in view
    );

    if (element) {
      observer.observe(element.nativeElement);
    }
  }

}
