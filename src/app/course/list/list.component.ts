import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { CourseService } from '../services/course.service';
import { ModuleType } from '../types/module-type';
import { SelectCourseType } from '../types/select-course-type';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private _courseService: CourseService) { }
  public courses: SelectCourseType[] = [];
  public modules: ModuleType[] = [];
  public lastArrow: any;

  ngOnInit(): void {
    this._courseService.findAll()
      .pipe(take(1))
      .subscribe((courses: SelectCourseType[]) => {
        this.courses = courses

        this.courses.forEach(element => {
          this.modules = element.modules
        });
      })

  }


}
