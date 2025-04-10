import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { WindowService } from '../../core/services/window.service';
import { SvgIconsModule } from '../../core/svg-icons/svg-icons.module';
import { ScrollTrackerService } from '../../core/services/scroll-tracker.service';

@Component({
  selector: 'page-performances',
  imports: [CommonModule, SvgIconsModule],
  templateUrl: './performances.component.html',
  styleUrl: './performances.component.scss'
})
export class PerformancesComponent implements OnInit{
  ws = inject(WindowService);
  scrollService = inject(ScrollTrackerService);

  ngOnInit(): void {
    this.scrollService.setActiveSection('');
  }
}
