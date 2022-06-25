import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule } from '@angular/router';
import { Auth2Module } from '../../auth2/auth2.module';
import { InicioComponent } from './inicio/inicio.component';



@NgModule({
  declarations: [

    LandingComponent,
      InicioComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    Auth2Module
  ]
})
export class LandingModule { }
