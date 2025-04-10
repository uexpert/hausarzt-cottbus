import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesCarouselComponent } from './images-carousel.component';

describe('ImagesCarouselComponent', () => {
  let component: ImagesCarouselComponent;
  let fixture: ComponentFixture<ImagesCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagesCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagesCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
