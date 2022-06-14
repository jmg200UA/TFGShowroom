//MODULES
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from '../../components/components.module';
//COMPONENTS
import { EditorComponent } from './editor.component';
import { RevisiontrabajosComponent } from './revisiontrabajos/revisiontrabajos.component';
import { RevisartrabajoComponent } from './revisartrabajo/revisartrabajo.component';


@NgModule({
  declarations: [
    EditorComponent,
    RevisiontrabajosComponent,
    RevisartrabajoComponent,
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
export class EditorModule { }
