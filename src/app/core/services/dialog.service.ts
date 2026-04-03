import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface DialogState {
  type: 'prompt' | 'confirm';
  title: string;
  message?: string;
  placeholder?: string;
  confirmLabel: string;
  confirmClass: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolve: (value: any) => void;
}

/**
 * Application-wide dialog service.
 *
 * Usage in any component:
 *   private dialog = inject(DialogService);
 *
 *   const name = await this.dialog.prompt('Titel', 'Platzhalter…');
 *   if (!name) return;
 *
 *   const ok = await this.dialog.confirm('Löschen', 'Wirklich löschen?');
 *   if (!ok) return;
 */
@Injectable({ providedIn: 'root' })
export class DialogService {
  readonly state$ = new BehaviorSubject<DialogState | null>(null);

  /** Opens a text-input dialog and resolves with the entered string, or null if cancelled. */
  prompt(title: string, placeholder = ''): Promise<string | null> {
    return new Promise(resolve => {
      this.state$.next({
        type: 'prompt',
        title,
        placeholder,
        confirmLabel: 'Speichern',
        confirmClass: 'btn btn-sm btn-primary',
        resolve,
      });
    });
  }

  /** Opens a confirmation dialog and resolves with true (confirmed) or false (cancelled). */
  confirm(title: string, message: string): Promise<boolean> {
    return new Promise(resolve => {
      this.state$.next({
        type: 'confirm',
        title,
        message,
        confirmLabel: 'Bestätigen',
        confirmClass: 'btn btn-sm btn-danger',
        resolve,
      });
    });
  }

  /** Called by DialogComponent to resolve the open dialog and close it. */
  _resolve(value: string | boolean | null) {
    this.state$.value?.resolve(value);
    this.state$.next(null);
  }
}
