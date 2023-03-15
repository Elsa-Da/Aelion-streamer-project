import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ISimpleStudent } from '../interfaces/i-simpleStudent';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private _studentService: StudentService) { }
  data: ISimpleStudent[]=[];
  public byIdSortOrder: number = -1
  public byLastNameSortOrder: number = 1
  public sortDefault: string = 'id'
  public checkUncheckAll: boolean = false


  ngOnInit(): void {
    this._studentService.findSimpleStudentDtos()
    .pipe(take(1))
    .subscribe((student: ISimpleStudent[]) =>
      { this.data = student })

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
      return {...s, isSelected: this.checkUncheckAll}
    })
  }
}
