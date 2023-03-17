import { Component, Input, OnInit } from '@angular/core';
import { ListComponent } from '../../list/list.component';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss']
})
export class ModuleListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() module: any;

}
