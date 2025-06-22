import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkinCancerIconComponent } from './skin-cancer-icon.component';

describe('SkinCancerIconComponent', () => {
  let component: SkinCancerIconComponent;
  let fixture: ComponentFixture<SkinCancerIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkinCancerIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkinCancerIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
