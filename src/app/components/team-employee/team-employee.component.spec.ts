import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamEmployeeComponent } from './team-employee.component';

describe('TeamEmployeeComponent', () => {
  let component: TeamEmployeeComponent;
  let fixture: ComponentFixture<TeamEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
