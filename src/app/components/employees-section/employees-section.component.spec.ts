import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeesSectionComponent } from './team-employees.component';


describe('EmployeesSectionComponent', () => {
  let component: EmployeesSectionComponent;
  let fixture: ComponentFixture<EmployeesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeesSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
