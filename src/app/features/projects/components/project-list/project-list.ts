import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Project } from '../../models/project.model';
import { ProjectCard } from '../project-card/project-card';
import { ProjectService } from '../../../../core/services/project.service';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';



@Component({
  selector: 'app-project-list',
  imports: [FormsModule, ProjectCard, EmptyState],
  templateUrl: './project-list.html',
})
export class ProjectList implements OnInit {
  private projectService = inject(ProjectService);

  projects = signal<Project[]>([]);
  searchTerm = signal('');

  filteredProjects = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    return this.projects().filter(p =>
      p.name.toLowerCase().includes(term)
    );
  });

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(projects => {
      this.projects.set(projects);
    });
  }

  onProjectSelected(project: Project): void {
    console.log(project);
  }
}