// 代码生成时间: 2025-08-18 11:28:20
import { Injectable } from '@angular/core';
import { FormGroup, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * FormValidatorService provides validation functions for form controls.
 */
@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  /**
   * Validates that a control is not empty.
   * @param control The form control to validate.
   * @returns ValidationErrors if the control is empty, otherwise null.
   */
  static notEmpty(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return { notEmpty: true };
    }
    return null;
  }

  /**
   * Validates that a control is not only whitespace.
   * @param control The form control to validate.
   * @returns ValidationErrors if the control is only whitespace, otherwise null.
   */
  static whitespace(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (typeof value === 'string' && value.trim() === '') {
      return { whitespace: true };
    }
    return null;
  }

  /**
   * Validates that a control matches a given pattern.
   * @param pattern The regular expression pattern to match against.
   * @returns A ValidatorFn that validates against the pattern.
   */
  static pattern(pattern: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const valid = pattern.test(control.value);
      return valid ? null : { pattern: { requiredPattern: pattern, actualValue: control.value } };
    };
  }

  /**
   * Validates that a control is a valid email address.
   * @returns A ValidatorFn that checks for a valid email pattern.
   */
  static email(): ValidatorFn {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return FormValidatorService.pattern(emailRegex);
  }

  /**
   * Creates a form group with validation using the provided validators.
   * @param formGroup The FormGroup to apply validation to.
   * @param validators An array of ValidatorFns to apply.
   * @returns The updated FormGroup with validators applied.
   */
  static createFormGroupWithValidation(formGroup: FormGroup, validators: ValidatorFn[]): FormGroup {
    formGroup.setValidators(validators);
    formGroup.updateValueAndValidity();
    return formGroup;
  }
}
