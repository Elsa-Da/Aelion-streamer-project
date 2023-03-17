import { Component, Input, OnInit } from '@angular/core';
import { ListComponent } from '../../list/list.component';

@Component({
  selector: 'app-course-tile',
  templateUrl: './course-tile.component.html',
  styleUrls: ['./course-tile.component.scss']
})
export class CourseTileComponent implements OnInit {

  constructor(private _listComponent: ListComponent) { }

  ngOnInit(): void {
  }

  @Input() course: any;

  public onClick(event: any): void {

    if (this._listComponent.lastArrow) {
      this._listComponent.lastArrow.setAttribute('class', 'arrow_up')
    }
    this._listComponent.lastArrow = event.target
    this.course.isSelected = !this.course.isSelected

    const courses = this._listComponent.courses
    courses.forEach(e => {
      if (e != this.course) {
        e.isSelected = false;
      }
    })

    if (this.course.isSelected == true) {
      event.target.setAttribute('class', 'arrow_down')
    } else {
      event.target.setAttribute('class', 'arrow_up')
    }


  }


}
