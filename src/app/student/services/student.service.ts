import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { ISimpleStudent } from '../interfaces/i-simpleStudent';
import { IStudent } from '../interfaces/i-student';
import { StudentModel } from '../models/student-model';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly endpoint: string = `${environment.apiRootUri}students`
  constructor(private _httpClient: HttpClient) {
  }

  public findAll():   Observable<IStudent[]> {
 return this._httpClient.get<IStudent[]>(this.endpoint)
  }

  public findOne(id: number): void {

  }

  public findSimpleStudent(): Observable<ISimpleStudent[]> {
    return this._httpClient.get<IStudent[]>(this.endpoint)
    .pipe(
      take(1),
      map((students: IStudent[]) => { // Transforme un Observable de IStudent[] en un Observable de ISimpleStudent[]
        return students.map((student:IStudent) => { // Transforme un tableau de IStudent en un tableau de ISimpleStudent
          return {
            id: student.id,
            lastName: student.lastName,
            firstName: student.firstName,
            email: student.email,
            isSelected : false
          }
        })
      })
    )

  }

  public findSimpleStudentDtos(): Observable<ISimpleStudent[]> {
    return this._httpClient.get<ISimpleStudent[]>(this.endpoint + '/simple')
  }

  public findByEmail(email: string): void {

  }

  public findByLoginOrEmail(email: string, login: string): void {

  }

  public add(student: IStudent): void {

  }

  public update(student: StudentModel): void {

  }

  public remove(student: StudentModel): void {

  }
}
