import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RouterModule } from '@angular/router';
import { ScrollTrackerService } from '../../core/services/scroll-tracker.service';

@Component({
  selector: 'header-component',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  imagesPath = environment.imagesPath;
  activeSection = '';

  constructor(private scrollService: ScrollTrackerService) {}

  ngOnInit() {
    this.scrollService.activeSection$.subscribe((section) => {
      this.activeSection = section;
    });
  }

}
