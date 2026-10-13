import { Component, input, output , computed} from '@angular/core';
import { Project } from '../../models/project.model';
import { TaskList } from '../task-list/task-list';
import {
  CurrencyPipe, DatePipe, DecimalPipe, KeyValuePipe,
  PercentPipe, SlicePipe, UpperCasePipe 
} from '@angular/common';
import { TaskPriority } from '../../models/task.model';
@Component({
  selector: 'app-project-card',
  imports: [TaskList, UpperCasePipe, DatePipe, CurrencyPipe, PercentPipe, DecimalPipe, SlicePipe, KeyValuePipe],
  templateUrl: './project-card.html',
})
export class ProjectCard {
  project = input.required<Project>();
  projectSelected = output<Project>();

  selectProject(): void {
    this.projectSelected.emit(this.project());
  }

  statusClass(status: Project['status']): string {
  const classes: Record<Project['status'], string> = {
    'En attente': 'bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-600/20',
    'En cours': 'bg-sky-50 text-sky-800 ring-1 ring-inset ring-sky-600/20',
    'Terminé': 'bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-600/20',
  };
  return classes[status];
}
  priorityDot(priority: string): string {
    const classes: Record<string, string> = {
      Haute: 'bg-red-500',
      Moyenne: 'bg-amber-500',
      Basse: 'bg-slate-400',
    };
    return classes[priority] ?? 'bg-slate-400';
  }
 

  completionRate = computed(() => {
    const tasks = this.project().tasks;
    if (tasks.length === 0) return 0;                                   // évite la division par zéro
    return tasks.filter(t => t.status === 'Terminé').length / tasks.length;
  });

  averageCost = computed(() => {
    const { budget, tasks } = this.project();   // récupère budget et tasks en une ligne
    if (tasks.length === 0) return 0;
    return budget / tasks.length;
  });

  priorityCounts = computed(() => {
    const counts: Record<TaskPriority, number> = { Basse: 0, Haute: 0, Moyenne: 0 };
    for (const task of this.project().tasks) {
      counts[task.priority]++;      
    }
    return counts;                  
  });
}