import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'; 
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';


const routes: Routes = [
  
  { path: '', component: HomeComponent }, 
  {
    path: 'admin',
    component: AdministradorComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login']))
  },
  { path: 'login', component: LoginComponent }, 
  { path: 'registro', component: RegistroComponent },
  { path: '**', component: NotFoundComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
