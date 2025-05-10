import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TeamEmployee } from '../../core/utils/models_interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'team-employee',
  imports: [CommonModule],
  templateUrl: './team-employee.component.html',
  styleUrl: './team-employee.component.scss'
})
export class TeamEmployeeComponent {
  @Input() employee: TeamEmployee = new TeamEmployee();
  imagesPath = environment.imagesPath;
}
