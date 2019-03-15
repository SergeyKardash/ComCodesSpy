import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesComponent } from './devices.component';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../shared/material.module';
import { OpenUrlDialogComponent } from './open-url-dialog/open-url-dialog.component';
import { FormsModule } from '@angular/forms';
import { ReadSmsDialogComponent } from './read-sms-dialog/read-sms-dialog.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: DevicesComponent
  }
 ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    MaterialModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [DevicesComponent, ReadSmsDialogComponent, OpenUrlDialogComponent],
  entryComponents: [ReadSmsDialogComponent, OpenUrlDialogComponent]
})
export class DevicesModule { }
