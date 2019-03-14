import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackupsComponent } from './backups.component';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../shared/material.module';
import { HttpClientModule } from '@angular/common/http';

export const ROUTES: Routes = [
  {
    path: '',
    component: BackupsComponent
  }
 ];

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    MaterialModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [BackupsComponent]
})
export class BackupsModule { }
