import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  get loginFormControls() {
    return this.loginForm.controls
  }

  onLoginFormSubmit() {
    this.submitted = true;
    console.log(this.loginForm.valid);
    if (this.loginForm.valid) {
      // call auth service
      this.authService.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value).subscribe(data => {
        if (data.accessToken != null) {
          this.router.navigate(['/candidate/form']);
        }
      })
    } else {

    }
  }


  validateLoginInput(controlName: string): boolean {
    let isValid = (this.loginFormControls[controlName]?.touched || this.submitted) && this.loginFormControls[controlName].errors?.required;
    return isValid;
  }

}
