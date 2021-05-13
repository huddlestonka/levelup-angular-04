import { Project } from '@bba/api-interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PROJECTS_FEATURE_KEY,
  ProjectsState,
  projectsAdapter,
} from './projects.reducer';

// Lookup the 'Projects' feature state managed by NgRx
export const getProjectsState = createFeatureSelector<ProjectsState>(
  PROJECTS_FEATURE_KEY
);

const { selectAll, selectEntities } = projectsAdapter.getSelectors();

export const getProjectsLoaded = createSelector(
  getProjectsState,
  (state: ProjectsState) => state.loaded
);

export const getProjectsError = createSelector(
  getProjectsState,
  (state: ProjectsState) => state.error
);

export const getAllProjects = createSelector(
  getProjectsState,
  (state: ProjectsState) => selectAll(state)
);

export const getProjectsEntities = createSelector(
  getProjectsState,
  (state: ProjectsState) => selectEntities(state)
);

export const getSelectedProjectId = createSelector(
  getProjectsState,
  (state: ProjectsState) => state.selectedId
);

export const getSelectedProject = createSelector(
  getProjectsEntities,
  getSelectedProjectId,
  (entities, selectedId) => {
    const emptyProject: Project = {
      id: '',
      title: '',
      details: '',
      percentComplete: 0,
      approved: false,
    };

    return selectedId ? entities[selectedId] : emptyProject;
  }
);
