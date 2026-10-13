import { Component, input, output } from '@angular/core';

export type ViewMode = 'task' | 'user';

@Component({
  selector: 'app-view-toggle',
  templateUrl: './view-toggle.html',
})
export class ViewToggle {
  view = input.required<ViewMode>();       // vue actuellement active (reçue du parent)
  viewChange = output<ViewMode>();         // prévient le parent d'un changement
private active = 'bg-white text-teal-800 shadow-sm';
private inactive = 'text-slate-600 hover:text-slate-900';

  buttonClass(mode: ViewMode): string {
    return this.view() === mode ? this.active : this.inactive;
  }

  select(mode: ViewMode): void {
    this.viewChange.emit(mode);
  }
}