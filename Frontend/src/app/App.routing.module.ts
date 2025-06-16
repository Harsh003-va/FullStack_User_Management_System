import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';

import { UpdateComponent } from './update/update.component';
import { AddComponent } from './add/add.component';
import { AboutComponent } from './about/about.component';

// app-routing.module.ts
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'welcome/:name',
    component: WelcomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'todos/:uname',
    component: TodoListComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'todo/update/:id',
    component: UpdateComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'todo/add/:id',
    component: AddComponent,
    canActivate: [AuthGuard],
  },
  { path: 'about', component: AboutComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
