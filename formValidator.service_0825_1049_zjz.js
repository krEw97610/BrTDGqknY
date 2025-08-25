// 代码生成时间: 2025-08-25 10:49:09
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, FormGroup, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {
  constructor() {}

  // Custom validator to check if the email is not already taken
  checkEmailExistence(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    // Dummy data - replace with actual database or API check
    const existingEmails: string[] = ['existing@example.com'];
    
    if (existingEmails.includes(email)) {
      return { emailExists: true };
    }
    return null;
  }

  // Validator for required fields
  requiredFieldValidator(requiredFields: string[]): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors | null => {
      let hasError = false;
      requiredFields.forEach(field => {
        if (!formGroup.get(field)?.valid) {
          hasError = true;
        }
      });

      if (hasError) {
        return { requiredFieldsError: true };
      }
      return null;
    };
  }

  // Validator for matching fields (e.g. password and password confirmation)
  matchingFieldsValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);
      
      if (matchingControl && control && control.value !== matchingControl.value) {
        matchingControl.setErrors({ notMatching: true });
        return { notMatching: true };
      } else {
        return null;
      }
    };
  }
}
