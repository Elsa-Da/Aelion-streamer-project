import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { map, Observable, take } from 'rxjs';
import { SelectCourseType } from '../types/select-course-type';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private readonly endpoint: string = `${environment.apiRootUri}course`
  constructor(private _httpClient: HttpClient) { }

  public findAll(): Observable<SelectCourseType[]> {
    return this._httpClient.get<SelectCourseType[]>(this.endpoint)
    // .pipe(
    //   take(1),
    //   map((courses: SelectCourseType[]) => {
    //     return courses.map((course: SelectCourseType) => {
    //       return { ...course, isSelected: false }
    //     })
    //   })
    // )
  }


}
