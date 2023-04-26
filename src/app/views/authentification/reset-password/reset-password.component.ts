import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/service/auth.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{
    // @ts-ignore
    authForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,private toaster: ToastrService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: ["", Validators.required],
    });
  }
  onSubmit() {
    console.log(this.authForm.value)
      this.authService.resetpassword(this.authForm.value['email']).subscribe((res: any) => {
        this.toaster.success("Mot de passe change avec success", 'OK');
      }, err => {
        console.log(err);
        this.toaster.error("Une erreur s'est produite", err.message);
      });
  }
}
