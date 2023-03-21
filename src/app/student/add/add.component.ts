import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public form: FormGroup = new FormGroup({})

  constructor(private _formBuilder: FormBuilder, private _studentService: StudentService) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      lastName: [
        '', // Default value
        [Validators.required] // Validators function
      ],
      firstName: [
        '',
        []
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        ]
      ],
      phoneNumber: [
        '',
        []
      ],
      login: [
        '', // Default value
        [Validators.required,
        Validators.minLength(8)] // Validators function
      ],
      password: [
        '', // Default value
        [Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)] // Validators function
      ]
    })
  }

  public get c(): { [key: string]: AbstractControl } {
    return this.form.controls
  }

  public onSubmit(): void {
    this._studentService.add(this.form.value)
  }

}
