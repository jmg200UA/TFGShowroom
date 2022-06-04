import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminModule } from './admin/admin.module';
import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [

  ],
  exports: [

  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModule

  ]
})
export class PagesModule { }
