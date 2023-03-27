import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentModel } from '../models/student-model';
import { StudentFormService } from '../services/student-form.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public form: FormGroup = new FormGroup({})
  public student: StudentModel = new StudentModel()

  constructor(private _studentService: StudentService, private _formService: StudentFormService) { }

  ngOnInit(): void {
    this.form = this._formService.form
  }

  public get c(): { [key: string]: AbstractControl } {
    return this._formService.c
  }

  public onSubmit(): void {
    this._studentService.add(this.form.value)
  }

}
