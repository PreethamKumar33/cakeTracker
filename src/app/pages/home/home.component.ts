import { Component, OnInit } from '@angular/core';
import { appService } from '../../services/app.service'
import { Subject } from "rxjs";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  result: any;
  todayBD: any[] = [];
  upcomingBD: any[] = [];

  constructor(
    private appService: appService
  ) { }

  error = new Subject<string>();

  ngOnInit(): void {
    this.getData()
  }

  async getData() {
     (await this.appService
      .getData())
      .subscribe(
        (responseData: { employeeData: any; }) => {
          this.result = responseData.employeeData

          this.result.map((employee: {
            nextYear: string;
            birthDate: any; "": any;
          }) => {
            let split = employee.birthDate.split('-')

            let today = String(new Date());

            let thisYear = today.split(' ')

            employee.birthDate = thisYear[3] + '-' + split[1] + '-' + split[2]

            employee.nextYear = String(parseInt(thisYear[3])+1)+ '-' + split[1] + '-' + split[2]
          })

          let upcoming = [];

          for (let details of this.result) {

            let today = new Date();

            let endDate = new Date(details.birthDate)

            let nextEndDate = new Date(details.nextYear)

            let diff = today.getTime() - endDate.getTime();

            let nextDiff = today.getTime() - nextEndDate.getTime();

            let diffdays = Math.floor(diff / (1000 * 3600 * 24));

            let nextDiffDays = Math.floor(nextDiff / (1000 * 3600 * 24));

            if (diffdays === 0) {
              this.todayBD.push(details.firstName + ' ' + details.lastName)
            }

            if(nextDiffDays > -366){
            details.diffdays = nextDiffDays;
            }else{
              details.diffdays = diffdays;
            }

            if (details.diffdays < 0 && -366 < details.diffdays) {
              upcoming.push(details)
            }

            let split = details.birthDate.split('-');

            details.birthDate = split[2] + '-' + split[1]
          }

          this.upcomingBD = upcoming.sort((a, b) => a.diffdays < b.diffdays ? 1 : -1);
        },
        (error: HttpErrorResponse) => this.error.next(error.message)
      );
  }

}
