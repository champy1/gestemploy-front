import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent
  implements OnInit{
  // @ts-ignore
  authForm: FormGroup;
  submitted = false;
  loading = false;
  error = "";
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: ["admin@localhost.com", Validators.required],
      password: ["123456789", Validators.required],
    });
  }

  get f() {
    return this.authForm!.controls;
  }
  onSubmit() {
    console.log(this.authForm.value)
    this.submitted = true;
    this.loading = true;
    this.error = "";
    if (this.authForm!.invalid) {
      this.error = "Username and Password not valid !";
      return;
    } else {
      this.authService.login(this.authForm.value['email'], this.authForm.value['password']);
      /*   this.subs.sink = this.authService
           .login(this.f.username.value, this.f.password.value)
           .subscribe(
             (res) => {
               if (res) {
                 setTimeout(() => {
                   const role = this.authService.currentUserValue.role;
                   if (role === Role.All || role === Role.Admin) {
                     this.router.navigate(["/admin/dashboard/main"]);
                   } else if (role === Role.Doctor) {
                     this.router.navigate(["/doctor/dashboard"]);
                   } else if (role === Role.Patient) {
                     this.router.navigate(["/patient/dashboard"]);
                   } else {
                     this.router.navigate(["/authentication/signin"]);
                   }
                   this.loading = false;
                 }, 1000);
               } else {
                 this.error = "Invalid Login";
               }
             },
             (error) => {
               this.error = error;
               this.submitted = false;
               this.loading = false;
             }
           );*/
    }
  }
}
