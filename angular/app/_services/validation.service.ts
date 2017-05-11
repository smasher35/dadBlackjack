import { FormControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {

  constructor() { }

  emailValidator(control: FormControl): { [key: string]: any } {
    var emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    if (control.value && !emailRegexp.test(control.value)) {
      return { invalidEmail: true };
    }
  }

  passwordLength(passwordKey: string) {
    let size = passwordKey.length;
    if(size >= 3) {
      return true;
    }
  }

}