import { Component, OnInit } from '@angular/core';
import { ProjectsFacade } from '@bba/core-state';

@Component({
  selector: 'bba-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  projects$ = this.projectsFacade.allProjects$;

  constructor(private projectsFacade: ProjectsFacade) {}

  ngOnInit(): void {
    this.projectsFacade.loadProjects();
  }
}
