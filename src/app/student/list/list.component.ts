import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { ISimpleStudent } from '../interfaces/i-simpleStudent';
import { StudentService } from '../services/student.service';
import { StudentFormComponent } from '../dialogs/student-form/student-form.component';
import { StudentModel } from '../models/student-model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private _studentService: StudentService, private _matDialog: MatDialog) { }
  data: ISimpleStudent[] = [];
  public byIdSortOrder: number = -1
  public byLastNameSortOrder: number = 1
  public sortDefault: string = 'id'
  public checkUncheckAll: boolean = false


  ngOnInit(): void {
    this._studentService.findSimpleStudentDtos()
      .pipe(take(1))
      .subscribe((student: ISimpleStudent[]) => {
        this.data = student
        this.data.sort((s1: ISimpleStudent, s2: ISimpleStudent) => s1.id! - s2.id!)
      })
  }

  public openForm(student: ISimpleStudent | null = null): void {
    if (!student) {
      this._openDialog(new StudentModel())
    } else {
      this._studentService.findOne(student.id!)
        .subscribe((completeStudent: StudentModel) => {
          this._openDialog(completeStudent)
        })
    }
  }

  public byId(): void {
    this.data.sort((s1: ISimpleStudent, s2: ISimpleStudent) => (s1.id! - s2.id!) * this.byIdSortOrder)
    this.byIdSortOrder = this.byIdSortOrder * -1
    this.sortDefault = 'id'
  }

  public byLastname(): void {
    this.data.sort((s1: ISimpleStudent, s2: ISimpleStudent) => s1.lastName.localeCompare(s2.lastName) * this.byLastNameSortOrder)
    this.byLastNameSortOrder = this.byLastNameSortOrder * -1
    this.sortDefault = 'lastName'
  }

  public onSelectStudent(student: ISimpleStudent): void {
    this.checkUncheckAll = this.data.filter((s: ISimpleStudent) => s.isSelected).length === this.data.length
  }

  public onCheckUncheckAll(): void {
    this.data = this.data.map((s) => {
      return { ...s, isSelected: this.checkUncheckAll }
    })
  }

  public deleteStudent(student: ISimpleStudent): void {
    this._studentService.delete(student.id!)
      .subscribe(() => {
        console.log("deleted!")
      })
  }


  private _openDialog(student: StudentModel): void {
    const dialogRef = this._matDialog.open(StudentFormComponent, {
      width: '500px',
      height: '700px',
      hasBackdrop: false,
      data: { student }
    })

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Convert StudentModel to SimpleStudent (or IStudent)
        const simpleStudent: ISimpleStudent = {
          id: result.id,
          lastName: result.lastName,
          firstName: result.firstName,
          email: result.email,
          isSelected: false
        }
        // if student already exists in students : replace it
        const index: number = this.data.findIndex((student: ISimpleStudent) => student.id === simpleStudent.id)
        if (index > -1) {
          this.data.splice(
            index,
            1,
            simpleStudent
          )
        } else {
          this.data.push(simpleStudent)
        }
        // else add it (and re sort table)
        this.data.sort((s1: ISimpleStudent, s2: ISimpleStudent) => s1.id! - s2.id!)
      } else {
        console.log('no result')
      }
    })
  }
}
