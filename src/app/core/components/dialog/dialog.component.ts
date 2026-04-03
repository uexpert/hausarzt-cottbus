import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [AsyncPipe, FormsModule],
  templateUrl: './dialog.component.html',
})
export class DialogComponent implements OnInit {
  private dialogService = inject(DialogService);
  readonly state$ = this.dialogService.state$;
  inputValue = '';

  ngOnInit() {
    // Reset the input field every time a new prompt dialog opens.
    this.state$.subscribe(state => {
      if (state?.type === 'prompt') this.inputValue = '';
    });
  }

  confirm() {
    const state = this.state$.value;
    if (!state) return;
    if (state.type === 'prompt') {
      const v = this.inputValue.trim();
      if (!v) return;
      this.dialogService._resolve(v);
    } else {
      this.dialogService._resolve(true);
    }
  }

  cancel() {
    const state = this.state$.value;
    if (!state) return;
    this.dialogService._resolve(state.type === 'prompt' ? null : false);
  }
}
