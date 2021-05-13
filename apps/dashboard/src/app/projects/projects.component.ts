import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '@bba/api-interfaces';
import { ProjectsFacade } from '@bba/core-state';

@Component({
  selector: 'bba-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]> = this.projectsFacade.allProjects$;
  selectedProject$: Observable<Project> = this.projectsFacade.selectedProject$;

  constructor(private projectsFacade: ProjectsFacade) {}

  ngOnInit(): void {
    this.loadProjects();
    this.projectsFacade.mutations$.subscribe((_) => this.reset());
  }

  reset() {
    this.loadProjects();
    this.projectsFacade.selectProject(null);
  }

  resetForm() {
    this.projectsFacade.selectProject(null);
  }

  loadProjects() {
    this.projectsFacade.loadProjects();
  }

  selectProject(project: Project) {
    this.projectsFacade.selectProject(project.id);
  }

  saveProject(project: Project) {
    if (project.id) {
      this.projectsFacade.updateProject(project);
    } else {
      this.projectsFacade.createProject(project);
    }
  }

  deleteProject(project: Project) {
    this.projectsFacade.deleteProject(project);
  }
}
