import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { MaterialModule } from '../shared/material.module';

export const ROUTES: Routes = [
 {
   path: '',
   component: LoginComponent
 }
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
  ],
  exports: [
    LoginComponent
  ],
})
export class LoginModule { }
