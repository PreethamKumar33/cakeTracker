import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import { Router } from '@angular/router';

import { employeeDataFormat } from "src/app/models/employeedata.module";
import { getDataFormat } from "../models/getdata.module";

@Injectable({
  providedIn: "root",
})

export class appService {
  private static readonly _addDetailsUrl = "http://localhost:3000/adddetails";
  private static readonly _getDetailsUrl = "http://localhost:3000/getdetails"
  error = new Subject<string>();
  result: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  addDetails(firstName: string, lastName: string, birthDate: string, country: string, city: string) {
    const employeeData: employeeDataFormat = { firstName: firstName, lastName: lastName, birthDate: birthDate, country: country, city: city };

    return this.http.post<any>(appService._addDetailsUrl, employeeData)
  }

  async getData(): Promise<Observable<any>> {

    return this.http.get<getDataFormat>(appService._getDetailsUrl);
  }
}

