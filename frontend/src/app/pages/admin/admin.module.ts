import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { GestionUsuariosComponent } from './gestionusuarios/gestionusuarios.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NuevousuarioComponent } from './nuevousuario/nuevousuario.component';
import { ComponentsModule } from '../../components/components.module';
import { AdminComponent } from './admin.component';
import { GestionTrabajosComponent } from './gestiontrabajos/gestiontrabajos.component';
import { NuevotrabajoComponent } from './nuevotrabajo/nuevotrabajo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentsModule
  ],
  declarations: [
    UserProfileComponent,
    GestionUsuariosComponent,
    NuevousuarioComponent,
    AdminComponent,
    GestionTrabajosComponent,
    NuevotrabajoComponent
  ],
  // exports:[
  //   UserProfileComponent,
  //   DashboardUsuariosComponent,
  //   NuevousuarioComponent,
  //   AdminComponent
  // ]
})

export class AdminModule {}
