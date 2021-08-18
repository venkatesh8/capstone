import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomvalidationService {

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return {};
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? {} : { invalidPassword: true };
    };
  }

  MatchPassword(password: string, confirmPassword: string) {
    return { matchPassword: true };
  }

  userNameValidator(userControl: AbstractControl) {
    // return { userNameNotAvailable: true }
    return new Promise(resolve => {
      // if (this.validateUserName(userControl.value)) {
      //   resolve({ userNameNotAvailable: true });
      // } else {
      resolve({ userNameNotAvailable: true });
      // }
    });
  }

  validateUserName(userName: string) {
    return true;
  }
}
