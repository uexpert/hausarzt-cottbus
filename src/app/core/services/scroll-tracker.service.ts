import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollTrackerService {
  private activeSection = new BehaviorSubject<string>(''); 
  activeSection$ = this.activeSection.asObservable();

  setActiveSection(sectionId: string) {
    this.activeSection.next(sectionId);
  }
}
