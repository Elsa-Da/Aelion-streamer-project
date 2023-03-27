import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { ISimpleStudent } from '../interfaces/i-simpleStudent';
import { IStudent } from '../interfaces/i-student';
import { StudentModel } from '../models/student-model';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly endpoint: string = `${environment.apiRootUri}students`
  constructor(private _httpClient: HttpClient, public snackBar: MatSnackBar, private _router: Router) {
  }

  public findAll(): Observable<IStudent[]> {
    return this._httpClient.get<IStudent[]>(this.endpoint)
  }

  public findOne(id: number): Observable<StudentModel> {
    return this._httpClient.get<StudentModel>(this.endpoint + '/' + id)
      .pipe(
        tap((response: any) => {
          console.log(JSON.stringify(response))
        }),
        take(1),
        map((student: any) => student)
      )

  }

  public findSimpleStudent(): Observable<ISimpleStudent[]> {
    return this._httpClient.get<IStudent[]>(this.endpoint)
      .pipe(
        take(1),
        map((students: IStudent[]) => { // Transforme un Observable de IStudent[] en un Observable de ISimpleStudent[]
          return students.map((student: IStudent) => { // Transforme un tableau de IStudent en un tableau de ISimpleStudent
            return {
              id: student.id,
              lastName: student.lastName,
              firstName: student.firstName,
              email: student.email,
              isSelected: false
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
    this._httpClient.post<IStudent>(this.endpoint, student)
      .pipe(take(1))
      .subscribe({
        next: (response: IStudent) => {
          console.log(JSON.stringify(response))
          const snackBarRef = this.snackBar.open("This student was created.", ' ', { duration: 3000, panelClass: ['snackbar'] })

          snackBarRef.afterDismissed().subscribe(() => {
            this._router.navigate(['/student', 'list']);
          });
        },
        error: (error: any) => {
          console.log(`Something went wrong : ${JSON.stringify(error)}`)
          this.snackBar.open("This student was'nt created.", ' ', { duration: 3000, panelClass: ['snackbarNo'] })
        }
      })

  }

  public fromModaleAdd(student: IStudent): Observable<any> {
    return this._httpClient.post<IStudent>(this.endpoint, student)
      .pipe(take(1))
  }


  public update(student: StudentModel): Observable<HttpResponse<any>> {
    return this._httpClient.put<StudentModel>(this.endpoint, student, { observe: 'response' })
  }

  public delete(id: number): Observable<StudentModel> {
    return this._httpClient.delete<StudentModel>(this.endpoint + '/' + id)
      .pipe(
        tap((response: any) => {
          console.log(`service delete ${JSON.stringify(response)}`)
        }),
        take(1),
        map((student: any) => student)
      )
  }

}
