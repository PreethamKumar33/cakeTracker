import { AbstractControl } from '@angular/forms';

export function ValidateCountry(control: AbstractControl) {
  if (control.value == "Select a Country") {
    return { invalidCountry: true };
  }
  return null;
}

export function ValidateAge(control: AbstractControl) {
    var today = new Date();
    let split = control.value.split('-')
    let year = split[0];
    let month = split[1];
    let date = split[2];

    let tempdate = year + '/' + month + '/' + date

    let birthDate = new Date(tempdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if(age <= 18){
        return  {invalidDate: true};
    }

    return null;
  }