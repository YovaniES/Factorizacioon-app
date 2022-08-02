import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

// import { LoginComponent } from './login/login.component';
import { NgxSpinnerModule } from "ngx-spinner";
// import { LoginComponent } from './loginH/login.component';
import { MaterialModule } from 'src/app/material/material.module';
import { LoginComponent } from './login/login.component';

// import { LoginComponent } from './loginH/login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    AuthRoutingModule,
    MaterialModule,
    NgxSpinnerModule,
  ]
})

export class AuthModule { }
