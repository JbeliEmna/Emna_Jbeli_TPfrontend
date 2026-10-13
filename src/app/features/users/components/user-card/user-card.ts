import { Component, computed, input } from '@angular/core';
import { User } from '../../models/user.model';
import { Project } from '../../../projects/models/project.model';
import { Task } from '../../../projects/models/task.model';
import { UserProjectGroup } from '../user-project-group/user-project-group';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { InitialsPipe } from '../../../../shared/pipes/initials-pipe';
import { LowerCasePipe, TitleCasePipe } from '@angular/common';

interface UserTaskGroup {
  projectId: number;
  projectName: string;
  tasks: Task[];
}
@Component({
  selector: 'app-user-card',
  imports: [UserProjectGroup, EmptyState, InitialsPipe, TitleCasePipe, LowerCasePipe],
  templateUrl: './user-card.html',
})

export class UserCard {
  user = input.required<User>();
  projects = input.required<Project[]>();

  groups = computed<UserTaskGroup[]>(() =>
    this.projects()
      .map(p => ({
        projectId: p.id,
        projectName: p.name,
        tasks: p.tasks.filter(t => t.assigneeId === this.user().id),
      }))
      .filter(g => g.tasks.length > 0)
  );

  private allTasks = computed(() => this.groups().flatMap(g => g.tasks));

  todoCount = computed(() => this.allTasks().filter(t => t.status === 'En attente').length);
  inProgressCount = computed(() => this.allTasks().filter(t => t.status === 'En cours').length);
  doneCount = computed(() => this.allTasks().filter(t => t.status === 'Terminé').length);
}