import { Injectable } from '@angular/core';
import { Project } from '@bba/api-interfaces';
import { Action, ActionsSubject, select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import * as ProjectsActions from './projects.actions';
import * as fromProjects from './projects.reducer';
import * as ProjectsSelectors from './projects.selectors';

@Injectable({
  providedIn: 'root',
})
export class ProjectsFacade {
  loaded$ = this.store.pipe(select(ProjectsSelectors.getProjectsLoaded));
  allProjects$ = this.store.pipe(select(ProjectsSelectors.getAllProjects));
  selectedProject$ = this.store.pipe(
    select(ProjectsSelectors.getSelectedProject)
  );

  mutations$ = this.actions$.pipe(
    filter(
      (action: Action) =>
        action.type === ProjectsActions.createProject({} as any).type ||
        action.type === ProjectsActions.updateProject({} as any).type ||
        action.type === ProjectsActions.deleteProject({} as any).type
    )
  );

  constructor(
    private store: Store<fromProjects.ProjectsPartialState>,
    private actions$: ActionsSubject
  ) {}

  selectProject(selectedId: string) {
    this.dispatch(ProjectsActions.selectProject({ selectedId }));
  }

  loadProjects() {
    this.dispatch(ProjectsActions.loadProjects());
  }

  loadProject(projectId: string) {
    this.dispatch(ProjectsActions.loadProject({ projectId }));
  }

  createProject(project: Project) {
    this.dispatch(
      ProjectsActions.createProject({
        project: Object.assign({}, project, { id: uuidv4() }),
      })
    );
  }

  updateProject(project: Project) {
    this.dispatch(ProjectsActions.updateProject({ project }));
  }

  deleteProject(project: Project) {
    this.dispatch(ProjectsActions.deleteProject({ project }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
