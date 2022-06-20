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
import { ActualizarusuarioComponent } from './admin/actualizarusuario/actualizarusuario.component';
import { ActualizartrabajoComponent } from './admin/actualizartrabajo/actualizartrabajo.component';
import { ActualizartitulacionComponent } from './admin/actualizartitulacion/actualizartitulacion.component';
//COMPONENTS ALUMNO
import { AlumnoComponent } from './alumno/alumno.component';
import { TrabajosComponent } from './alumno/trabajos/trabajos.component';
import { NuevostrabajosComponent } from './alumno/nuevostrabajos/nuevostrabajos.component';
import { SubirtrabajoComponent } from './alumno/subirtrabajo/subirtrabajo.component';
//COMPONENTS EDITOR
import { EditorComponent } from './editor/editor.component';
import { RevisiontrabajosComponent } from './editor/revisiontrabajos/revisiontrabajos.component';
import { RevisartrabajoComponent } from './editor/revisartrabajo/revisartrabajo.component';
//COMPONENT PERFIL GENERAL
import { UserProfileComponent } from './user-profile/user-profile.component';
//COMPONENTS LANDING
import { LandingComponent } from './landing/landing.component';







export const routes: Routes = [


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
    { path: 'actualizarusuario/:uid', component: ActualizarusuarioComponent, canActivate: [ AuthGuard ], data: {
                                                            rol: 'ROL_ADMIN',
                                                            titulo: 'Showroom Admin - Actualizar Usuario',
                                                            breadcrums: [{titulo: 'Usuarios', url: '/admin/usuarios'}]
                                                          }},
    { path: 'actualizartrabajo/:uid', component: ActualizartrabajoComponent, canActivate: [ AuthGuard ], data: {
                                                            rol: 'ROL_ADMIN',
                                                            titulo: 'Showroom Admin - Actualizar Trabajo',
                                                            breadcrums: [{titulo: 'Trabajos', url: '/admin/trabajos'}]
                                                          }},
    { path: 'actualizartitulacion/:uid', component: ActualizartitulacionComponent, canActivate: [ AuthGuard ], data: {
                                                            rol: 'ROL_ADMIN',
                                                            titulo: 'Showroom Admin - Actualizar Titulación',
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

  //PATHS EDITOR
  { path: 'editor', component: EditorComponent,canActivate: [ AuthGuard], data: {rol: 'ROL_EDITOR'},
  children:[
    { path: 'revisiontrabajos', component: RevisiontrabajosComponent, canActivate: [ AuthGuard ], data: {
                                                            rol: 'ROL_EDITOR',
                                                            titulo: 'Showroom Editor - Trabajos para revisar',
                                                            breadcrums: []
                                                          },},
    { path: 'revisartrabajo/:uid', component: RevisartrabajoComponent, canActivate: [ AuthGuard ], data: {
                                                            rol: 'ROL_EDITOR',
                                                            titulo: 'Showroom Editor - Revisión Trabajo',
                                                            breadcrums: []
                                                          },},

    { path: '**', redirectTo: 'editor/revisiontrabajos'}
  ]},

  //PATHS LANDING
  { path: 'landing', component: LandingComponent,},

  { path: '**', redirectTo: 'landing'}

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
