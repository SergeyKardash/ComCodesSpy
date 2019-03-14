import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'devices-list' },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
  },
  {
    path: 'devices-list',
    canActivate: [AuthGuard],
    loadChildren: './devices/devices.module#DevicesModule'
  },
  {
    path: 'backups',
    canActivate: [AuthGuard],
    loadChildren: './backups/backups.module#BackupsModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
