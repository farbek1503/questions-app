import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateQuestionComponent } from './components/create-question/create-question.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InfoComponent } from './components/info/info.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { UserGuard } from './guard/user.guard';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
	
	{ path: 'login', component: LoginComponent, canActivate: [UserGuard] },
	{ path: 'register', component: RegisterComponent, canActivate: [UserGuard] },
	
	{ path: 'create-question', component: CreateQuestionComponent, canActivate: [AuthGuard] },
	{ path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
	{ path: 'info', component: InfoComponent, canActivate: [AuthGuard] },
	
	{ path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
