import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StudentModel } from '../models/student-model';
import { StudentService } from './../services/student.service';

@Component({
  selector: 'app-update',
  templateUrl: './../add/add.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  public form: FormGroup = new FormGroup({})
  public student: StudentModel | null = null

  constructor(private _route: ActivatedRoute, private _service: StudentService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log(this._route.snapshot.paramMap.get('id'))
    const id: number = +this._route.snapshot.paramMap.get('id')!
    this._service.findOne(id)
      .subscribe({
        next: (student: StudentModel) => {
          this.student = student
          this._buildForm()
        },
        error: (error: any) => {
          console.log("Smthg went wrong")
        }
      })
  }
  get c(): { [key: string]: AbstractControl } {
    return this.form.controls
  }

  onSubmit(): void {
    this.student!.lastName = this.c['lastName'].value
    this.student!.firstName = this.c['firstName'].value
    this.student!.email = this.c['email'].value
    this.student!.phoneNumber = this.c['phoneNumber'].value
    this.student!.login = this.c['login'].value
    this.student!.password = this.c['password'].value

    this._service.update(this.student!)
      .subscribe({
        next: (response: HttpResponse<any>) => {
          console.log(`Student was updated ${response.status}`)
        },
        error: (error: any) => {
          console.log(JSON.stringify(error))
        }
      })
  }

  private _buildForm(): void {
    this.form = this._formBuilder.group({
      lastName: [
        this.student!.lastName, // Default value
        [Validators.required] // Validators function
      ],
      firstName: [
        this.student!.firstName,
        []
      ],
      email: [
        this.student!.email,
        [
          Validators.required,
          Validators.pattern(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        ]
      ],
      phoneNumber: [
        this.student!.phoneNumber,
        []
      ],
      login: [
        this.student!.login, // Default value
        [Validators.required,
        Validators.minLength(8)] // Validators function
      ],
      password: [
        this.student!.password, // Default value
        [Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)] // Validators function
      ]
    })
  }

}
