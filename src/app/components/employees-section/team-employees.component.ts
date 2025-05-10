import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TeamEmployeeComponent } from '../team-employee/team-employee.component';
import { TeamEmployee } from '../../core/utils/models_interfaces';

@Component({
  selector: 'employees-section',
  imports: [CommonModule, TeamEmployeeComponent],
  templateUrl: './employees-section.component.html',
  styleUrl: './employees-section.component.scss'
})
export class EmployeesSectionComponent {
  @Input() employeesList: Array<TeamEmployee> = [];
}
