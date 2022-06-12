import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
//COMPONENTS ADMIN
import { AdminComponent } from './admin/admin.component';
import { GestionUsuariosComponent } from './admin/gestionusuarios/gestionusuarios.component';
import { GestionTrabajosComponent } from './admin/gestiontrabajos/gestiontrabajos.component';
import { GestionTitulacionesComponent } from './admin/gestiontitulaciones/gestiontitulaciones.component';
import { NuevousuarioComponent } from './admin/nuevousuario/nuevousuario.component';
import { NuevotrabajoComponent } from './admin/nuevotrabajo/nuevotrabajo.component';
import { NuevatitulacionComponent } from './admin/nuevatitulacion/nuevatitulacion.component';
//COMPONENTS ALUMNO
import { AlumnoComponent } from './alumno/alumno.component';
import { TrabajosComponent } from './alumno/trabajos/trabajos.component';
import { NuevostrabajosComponent } from './alumno/nuevostrabajos/nuevostrabajos.component';
import { SubirtrabajoComponent } from './alumno/subirtrabajo/subirtrabajo.component';
//COMPONENT PERFIL GENERAL
import { UserProfileComponent } from './user-profile/user-profile.component';
//COMPONENTS LANDING
import { LandingComponent } from './landing/landing.component';






export const routes: Routes = [

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

  { path: 'admin', component: AdminComponent,canActivate: [ AuthGuard], data: {rol: 'ROL_ADMIN'},
  children:[
    { path: 'usuarios', component: GestionUsuariosComponent, canActivate: [ AuthGuard ], data: {
                                                            rol: 'ROL_ADMIN',
                                                            titulo: 'Showroom Admin - Gestión Usuarios',
                                                            breadcrums: []
                                                          },},
    { path: 'trabajos', component: GestionTrabajosComponent, canActivate: [ AuthGuard ], data: {
                                                            rol: 'ROL_ADMIN',
                                                            titulo: 'Showroom Admin - Gestión Trabajos',
                                                            breadcrums: []
                                                          },},
    { path: 'titulaciones', component: GestionTitulacionesComponent, canActivate: [ AuthGuard ], data: {
                                                            rol: 'ROL_ADMIN',
                                                            titulo: 'Showroom Admin - Gestión Titulaciones',
                                                            breadcrums: []
                                                          },},
    { path: 'perfil',  component: UserProfileComponent, canActivate: [ AuthGuard ], data: {
                                                            rol: 'ROL_ADMIN',
                                                            titulo: 'Perfil',
                                                            breadcrums: []
                                                          },},
    { path: 'nuevousu', component: NuevousuarioComponent, canActivate: [ AuthGuard ], data: {
                                                            rol: 'ROL_ADMIN',
                                                            titulo: 'Showroom Admin - Nuevo Usuario',
                                                            breadcrums: [{titulo: 'Usuarios', url: '/admin/usuarios'}]
                                                          }},
    { path: 'nuevotrabajo', component: NuevotrabajoComponent, canActivate: [ AuthGuard ], data: {
                                                            rol: 'ROL_ADMIN',
                                                            titulo: 'Showroom Admin - Nuevo Trabajo',
                                                            breadcrums: [{titulo: 'Trabajos', url: '/admin/trabajos'}]
                                                          }},
    { path: 'nuevatitulacion', component: NuevatitulacionComponent, canActivate: [ AuthGuard ], data: {
                                                            rol: 'ROL_ADMIN',
                                                            titulo: 'Showroom Admin - Nueva Titulación',
                                                            breadcrums: [{titulo: 'Titulaciones', url: '/admin/titulaciones'}]
                                                          }},

    { path: '**', redirectTo: 'admin/usuarios'}
  ]},

  //PATHS ALUMNO
  { path: 'alumno', component: AlumnoComponent,canActivate: [ AuthGuard], data: {rol: 'ROL_ALUMNO'},
  children:[
    { path: 'trabajos', component: TrabajosComponent, canActivate: [ AuthGuard ], data: {
                                                            rol: 'ROL_ALUMNO',
                                                            titulo: 'Showroom Alumno - Trabajos',
                                                            breadcrums: []
                                                          },},
    { path: 'nuevostrabajos', component: NuevostrabajosComponent, canActivate: [ AuthGuard ], data: {
                                                            rol: 'ROL_ALUMNO',
                                                            titulo: 'Showroom Alumno - Nuevos Trabajos',
                                                            breadcrums: []
                                                          },},
    { path: 'subirtrabajo/:uid', component: SubirtrabajoComponent, canActivate: [ AuthGuard ], data: {
                                                            rol: 'ROL_ALUMNO',
                                                            titulo: 'Showroom Alumno - Subir Trabajo',
                                                            breadcrums: []
                                                          },},

    { path: '**', redirectTo: 'alumno/trabajos'}
  ]},

  //PATHS LANDING
  { path: 'landing', component: LandingComponent,},

  { path: '**', redirectTo: 'admin/usuarios'}

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
