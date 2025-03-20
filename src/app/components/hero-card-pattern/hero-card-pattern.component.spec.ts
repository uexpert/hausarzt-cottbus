import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroCardPatternComponent } from './hero-card-pattern.component';

describe('HeroCardPatternComponent', () => {
  let component: HeroCardPatternComponent;
  let fixture: ComponentFixture<HeroCardPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroCardPatternComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroCardPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
