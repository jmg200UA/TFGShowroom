//MODULES
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from '../../components/components.module';
//COMPONENTS
import { AlumnoComponent } from './alumno.component';
import { TrabajosComponent } from './trabajos/trabajos.component';
import { NuevostrabajosComponent } from './nuevostrabajos/nuevostrabajos.component';


@NgModule({
  declarations: [
    AlumnoComponent,
    TrabajosComponent,
    NuevostrabajosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentsModule
  ]
})
export class AlumnoModule { }
