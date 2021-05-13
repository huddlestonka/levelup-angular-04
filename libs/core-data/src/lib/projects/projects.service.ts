import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '@bba/api-interfaces';
import { environment } from '@env/environment';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  model = 'projects';

  constructor(private http: HttpClient) {}

  all() {
    return this.http.get<Project[]>(this.getUrl());
  }

  find(id: string) {
    return this.http.get<Project>(this.getUrlWithId(id));
  }

  create(project: Project) {
    return this.http.post(this.getUrl(), project, { headers: headers });
  }

  update(project: Project) {
    return this.http.put(this.getUrlWithId(project.id), project, {
      headers: headers,
    });
  }

  delete(project: Project) {
    return this.http.delete(this.getUrlWithId(project.id));
  }

  private getUrl() {
    return `${environment.apiEndpoint}${this.model}`;
  }

  private getUrlWithId(id) {
    return `${this.getUrl()}/${id}`;
  }
}
