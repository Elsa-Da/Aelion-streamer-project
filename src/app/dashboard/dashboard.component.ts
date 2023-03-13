import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public tiles: Array<any> = []
  public isAdmin: boolean = true

  constructor() { }

  ngOnInit(): void {
    this.tiles.push({
      title: 'Parameters',
      summary: 'Parameters management',
      action: ['dashboard']
    },
    {
      title: 'Students',
      summary: 'Add, remove, view student',
      action: ['dashboard']
    },
    {
      title: 'Courses',
      summary: 'Managa courses and medias',
      action: ['dashboard']
    })
  }

  public onClick(object: any): void {
    this.tiles.splice (
      this.tiles.indexOf(object),
      1
    )
  }


}
