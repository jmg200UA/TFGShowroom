import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';

export const AdminRoutes: Routes = [
    { path: 'perfil',   component: UserProfileComponent },
    { path: 'usuario',     component: TableListComponent },
];
