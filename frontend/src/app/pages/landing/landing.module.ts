import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule } from '@angular/router';
import { Auth2Module } from '../../auth2/auth2.module';



@NgModule({
  declarations: [

    LandingComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    Auth2Module
  ]
})
export class LandingModule { }
