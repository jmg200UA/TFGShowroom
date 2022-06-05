import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { AuthGuard } from '../guards/auth.guard';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { DashboardUsuariosComponent } from './admin/dashboardusuarios/dashboardusuarios.component';
import { DashboardTrabajosComponent } from './admin/dashboardtrabajos/dashboardtrabajos.component';
import { AdminComponent } from './admin/admin.component';
import { NuevousuarioComponent } from './admin/nuevousuario/nuevousuario.component';



const routes: Routes = [

  //Comentado de ejemplo
  // { path: 'admin', component: AdminLayoutComponent, canActivate: [ AuthGuard], data: {rol: 'ROL_ADMIN'},
  //   children: [
  //   { path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuard ], data: {
  //                                                       rol: 'ROL_ADMIN',
  //                                                       titulo: '¡Bienvenido Administrador!',
  //                                                       breadcrums: []
  //                                                     },},
  //   { path: 'usuarios', component: UsuariosComponent, canActivate: [ AuthGuard ], data: {
  //                                                       rol: 'ROL_ADMIN',
  //                                                       titulo: 'Usuarios',
  //                                                       breadcrums: [ ],
  //                                                     },},
  //   { path: 'usuarios/usuario/:uid', component: UsuarioComponent, canActivate: [ AuthGuard ], data: {
  //                                                       rol: 'ROL_ADMIN',
  //                                                       titulo: 'Usuario',
  //                                                       breadcrums: [ {titulo: 'Usuarios', url: '/admin/usuarios'} ],
  //                                                     },},

  //   { path: 'estadisticas', component: EstadisticasComponent, canActivate: [ AuthGuard ], data: {
  //                                                       rol: 'ROL_ADMIN',
  //                                                       titulo: 'Estadisticas',
  //                                                       breadcrums: [ ],
  //                                                     },},
  //   { path: 'motor-grafico', component: MotorGraficoComponent, canActivate: [ AuthGuard ], data: {
  //                                                       rol: 'ROL_ADMIN',
  //                                                       titulo: 'Motor gráfico',
  //                                                       breadcrums: [ ],
  //   },},
  //   { path: 'ejercicios/ejercicio/:uid', component: EjercicioComponent, canActivate: [ AuthGuard ], data: {
  //                                                       rol: 'ROL_ADMIN',
  //                                                       titulo: 'Ejercicio',
  //                                                       breadcrums: [ {titulo: 'Ejercicios', url: '/fisio/ejercicios'}],
  //                                                 },},
  //   { path: 'ejercicios', component: EjerciciosComponent, canActivate: [ AuthGuard ], data: {
  //                                                       rol: 'ROL_ADMIN',
  //                                                       titulo: 'Ejercicios',
  //                                                       breadcrums: [ ],
  //                                                     },},

  //   { path: '**', redirectTo: 'dashboard'}
  // ]},

  //PATHS ADMIN

  { path: 'admin', component: AdminComponent,
  children:[
    { path: 'dashboard', component: DashboardUsuariosComponent},
    { path: 'trabajos', component: DashboardTrabajosComponent},
    { path: 'perfil', component: UserProfileComponent},
    { path: 'nuevousu', component: NuevousuarioComponent},

    { path: '**', redirectTo: 'admin/dashboard'}
  ]},

  { path: '**', redirectTo: 'admin/dashboard'}

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
