import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(
    private appService: appService,
    private router: Router,
    // private fb:FormControl
  ) { }

  error = new Subject<string>();

  ngOnInit(): void {
    this.Success = false;
    // this.fb.value({
    //   firstNAme : ['',Validators.required]
    // })
  }

  onSubmit(firstName: string, lastName: string, birthDate: string, country: string, city: string) {

    this.appService
      .addDetails(firstName, lastName, birthDate, country, city)
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
}