import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { AuthRoutingModule } from './auth/auth.routing';
import { PagesRoutingModule } from './pages/pages.routing';
import { AdminComponent } from './pages/admin/admin.component';


const routes: Routes = [
  { path: 'admin',   component: AdminComponent },
  { path: '**', redirectTo: 'admin'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
