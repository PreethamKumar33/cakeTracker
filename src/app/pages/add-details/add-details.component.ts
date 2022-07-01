import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ValidateCountry, ValidateAge } from '../../validators/form.validator'

import { Subject } from "rxjs";
import { appService } from '../../services/app.service'


@Component({
  selector: 'add-details',
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.scss']
})
export class AddDetailsComponent implements OnInit {
  Success: any;
  errormsg: any;
  myForm!: FormGroup;

  constructor(
    private appService: appService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  error = new Subject<string>();

  ngOnInit(): void {
    this.Success = false;
    this.myForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required ],
      birthDate: ['', [Validators.required, ValidateAge]],
      country: ['', [Validators.required, ValidateCountry]],
      city: ['', Validators.required,]
    });
  }

  onSubmit(form: FormGroup) {

    this.appService
      .addDetails(form.value.firstName, form.value.lastName, form.value.birthDate, form.value.country, form.value.city)
      .subscribe(
        (responseData) => {
          this.Success = responseData.status
          if (this.Success) this.errormsg = null
          console.log(responseData)
        },
        (error: HttpErrorResponse) => {
          this.Success = false;
          this.errormsg = error.error.message;
          this.error.next(error.message);
        }
      );
  };

  get DOB(){
    let tempDOB = this.myForm.get('birthDate');
    return tempDOB?.value.length < 0
  }
}