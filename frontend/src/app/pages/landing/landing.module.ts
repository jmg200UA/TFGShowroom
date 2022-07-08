import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule } from '@angular/router';
import { Auth2Module } from '../../auth2/auth2.module';
import { InicioComponent } from './inicio/inicio.component';
import { SwiperModule } from 'swiper/angular';
import { DetallestrabajoComponent } from './detallestrabajo/detallestrabajo.component';
import {SafePipe} from '../../pipes/SafePipe'



@NgModule({
  declarations: [

    LandingComponent,
      InicioComponent,
      DetallestrabajoComponent,
      SafePipe

  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    Auth2Module,
    SwiperModule
  ]
})
export class LandingModule { }
