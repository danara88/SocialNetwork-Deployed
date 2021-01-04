import { ModuleWithProviders } from '@angular/core'; // Componente para configurar el routing
import { Routes, RouterModule } from '@angular/router'; // Para tener la capacidad de crear nuevas rutas y comnfigurarlas

// Componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { TimelineComponent } from "./components/timeline/timeline.component";
import { ProfileComponent } from './components/profile/profile.component';
import { FollowingComponent } from './components/following/following.component';
import { FollowedComponent } from "./components/followed/followed.component";

import { UserGuard } from './services/user.guard'; // Para usarlo aqui primero tengo que darlo de alta en app 

const appRoutes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'home', component: HomeComponent, canActivate:[UserGuard]},
	{path: 'login', component: LoginComponent},
	{path: 'registro', component: RegisterComponent},
	{path: 'mis-datos', component: UserEditComponent, canActivate:[UserGuard]},
	{path: 'gente', component: UsersComponent, canActivate:[UserGuard]},
	{path: 'gente/:page', component: UsersComponent, canActivate:[UserGuard]},
	{path: 'timeline', component: TimelineComponent, canActivate:[UserGuard]},
	{path: 'perfil/:id', component: ProfileComponent, canActivate:[UserGuard]},
	{path: 'siguiendo/:id/:page', component: FollowingComponent, canActivate:[UserGuard]},
	{path: 'seguidores/:id/:page', component: FollowedComponent, canActivate:[UserGuard]},
	{path: '**', component: HomeComponent, canActivate:[UserGuard]}
];

// Exportar el provider de rutas y el modulo de rutas que se ha configurado arriba
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes); // Incrustar la configuracion anteriror en el sistema de rutas