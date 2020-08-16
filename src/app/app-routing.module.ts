import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsuarioComponent} from './usuario/usuario.component';
import {ListaUsuarioComponent} from './lista-usuario/lista-usuario.component';

const routes: Routes = [
  {path: 'usuario', component: UsuarioComponent,},
  {path: 'lista-usuario', component: ListaUsuarioComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
