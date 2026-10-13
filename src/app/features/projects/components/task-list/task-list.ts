import { Component, OnInit, inject, input, signal } from '@angular/core';
import { Task } from '../../models/task.model';
import { User } from '../../../users/models/user.model';
import { UserService } from '../../../../core/services/user.service';
import { DatePipe } from '@angular/common';
import { TruncatePipe } from '../../../../shared/pipes/truncate-pipe';
import { DeadlinePipe } from '../../../../shared/pipes/deadline-pipe';

@Component({
  selector: 'app-task-list',
  imports: [DatePipe, TruncatePipe, DeadlinePipe],
  templateUrl: './task-list.html',
})
export class TaskList implements OnInit {
  private userService = inject(UserService);

  tasks = input.required<Task[]>();
  showAssignee = input(true);          // true par défaut, on pourra le passer à false

  users = signal<User[]>([]);

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => this.users.set(users));
  }

  assigneeName(id?: number): string {
    if (id === undefined) return 'Non assignée';
    return this.users().find(u => u.id === id)?.name ?? 'Inconnu';
  }

  borderClass(status: Task['status']): string {
  const classes: Record<Task['status'], string> = {
    'En attente': 'border-amber-400',
    'En cours': 'border-sky-500',
    'Terminé': 'border-emerald-500',
  };
  return classes[status];
}

priorityClass(priority: Task['priority']): string {
  const classes: Record<Task['priority'], string> = {
    Haute: 'bg-red-50 text-red-700',
    Moyenne: 'bg-amber-50 text-amber-700',
    Basse: 'bg-slate-100 text-slate-600',
  };
  return classes[priority];
}
deadlineClass(task: Task): string {
  const today = new Date().toLocaleDateString('en-CA');   
  const overdue = !!task.dueDate && task.status !== 'Terminé' && task.dueDate < today;
  return overdue ? 'bg-red-50 text-red-700' : 'text-slate-500';
}
}