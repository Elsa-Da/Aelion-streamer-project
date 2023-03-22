import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentModel } from '../models/student-model';

@Injectable({
  providedIn: 'root'
})
export class StudentFormService {
  private _form: FormGroup = new FormGroup({})
  private _student: StudentModel = new StudentModel()

  constructor(private _formBuilder: FormBuilder) {
    this._buildForm()
  }

  public buildForm(student: StudentModel): void {
    this._student = student
    this._buildForm()
  }

  public get c(): { [key: string]: AbstractControl } {
    return this._form.controls
  }

  /**
   * studentFormService.form <- this._form
   */
  get form(): FormGroup {
    return this._form
  }

  private _buildForm(): void {
    this._form = this._formBuilder.group({
      lastName: [
        this._student.lastName,
        [
          Validators.required
        ]
      ],
      firstName: [
        this._student.firstName,
      ],
      email: [
        this._student.email,
        [
          Validators.required,
          Validators.pattern(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        ]
      ],
      phoneNumber: [
        this._student.phoneNumber
      ],
      login: [
        this._student.login,
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ],
      password: [
        this._student.password,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
        ]
      ]
    })
  }
}
