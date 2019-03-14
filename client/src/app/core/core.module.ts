import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../shared/material.module';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [HeaderComponent, SidenavComponent],
  exports: [HeaderComponent, SidenavComponent]
})
export class CoreModule { }
