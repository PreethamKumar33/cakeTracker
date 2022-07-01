import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { appService } from '../../services/app.service'


@Component({
  selector: 'list-all',
  templateUrl: './list-all.component.html',
  styleUrls: ['./list-all.component.scss']
})
export class ListAllComponent implements OnInit {
  error: any;
  result: any;

  constructor(
    private appService: appService
  ) { }

  ngOnInit(): void {
    this.getData()
  }


  async getData() {
    (await this.appService
      .getData())
      .subscribe(
        (responseData) => {
          this.result = responseData.employeeData
          console.log(this.result)
        },
        (error: HttpErrorResponse) => this.error.next(error.message)
      );
  }
}