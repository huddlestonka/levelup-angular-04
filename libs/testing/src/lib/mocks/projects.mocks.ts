import { Project } from '@bba/api-interfaces';
import { of } from 'rxjs';

export const mockProjectsFacade = {
  loadProjects: () => {},
  selectProject: () => {},
  deleteProject: () => {},
  updateProject: () => {},
  createProject: () => {},
  mutations$: of(true),
};

export const mockProjectsService = {
  all: () => of([]),
  find: () => of({ ...mockProject }),
  create: () => of({ ...mockProject }),
  update: () => of({ ...mockProject }),
  delete: () => of({ ...mockProject }),
};

export const mockProject = {
  id: '0',
  title: 'mock',
  details: 'mock',
  percentComplete: 0,
  approved: false,
};

export const mockEmptyProject = {
  id: null,
  title: 'mockEmpty',
  details: 'mockEmpty',
  percentComplete: null,
  approved: null,
};
