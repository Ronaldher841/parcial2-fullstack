import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { PerfilComponent } from './pages/perfil/perfil';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: '**', redirectTo: '' }
];