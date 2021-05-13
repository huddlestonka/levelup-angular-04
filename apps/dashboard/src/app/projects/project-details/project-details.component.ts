import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from '@bba/api-interfaces';

@Component({
  selector: 'bba-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent {
  currentProject: Project;
  originalTitle = '';
  @Input() set project(value: Project) {
    if (value) this.originalTitle = value.title;
    this.currentProject = { ...value };
  }
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();
}
