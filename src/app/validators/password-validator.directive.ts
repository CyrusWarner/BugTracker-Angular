import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// custom validator for making sure the password and confirm password field values are matching
export const passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')
  const confirmPassword = control.get('confirmPassword')

  return password && confirmPassword && password.value != confirmPassword.value
    ? {misMatchPasswords: true}
    : null
}
