import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthentificationRoutingModule } from './authentification-routing.module';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import {ButtonGroupModule, ButtonModule, CardModule, FormModule, GridModule} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    Page404Component,
    Page500Component,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthentificationRoutingModule,
    CardModule,
    FormModule,
    ButtonGroupModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormsModule,ReactiveFormsModule,


  ]
})
export class AuthentificationModule {
}
