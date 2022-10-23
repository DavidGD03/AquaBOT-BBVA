import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioLoginComponent } from './usuario/usuario-obtener/usuario-obtener.component';
import { UsuarioSignupComponent } from './usuario/usuario-signup/usuario-signup.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioSignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'obtener/:nombre/:apellidos/:sexo/:nacimiento/:expedicion/:cedula/:celular/:correo',
    component: UsuarioLoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: UsuarioSignupComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
