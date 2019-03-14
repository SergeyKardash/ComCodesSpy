import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatDialogModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class MaterialModule {}
