import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { DashboardUsuariosComponent } from './dashboardusuarios/dashboardusuarios.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NuevousuarioComponent } from './nuevousuario/nuevousuario.component';
import { ComponentsModule } from '../../components/components.module';
import { AdminComponent } from './admin.component';
import { DashboardTrabajosComponent } from './dashboardtrabajos/dashboardtrabajos.component';

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
    DashboardUsuariosComponent,
    NuevousuarioComponent,
    AdminComponent,
    DashboardTrabajosComponent
  ],
  // exports:[
  //   UserProfileComponent,
  //   DashboardUsuariosComponent,
  //   NuevousuarioComponent,
  //   AdminComponent
  // ]
})

export class AdminModule {}
