import { PagamentoComponent } from './pagamento/pagamento.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsuarioComponent} from './usuario/usuario.component';
import {ListaUsuarioComponent} from './lista-usuario/lista-usuario.component';
import {ListaPagamentosComponent} from './lista-pagamentos/lista-pagamentos.component';

const routes: Routes = [
  {path: 'usuario', component: UsuarioComponent,},
  {path: 'lista-usuario', component: ListaUsuarioComponent,},
  {path: 'pagamento', component: PagamentoComponent},
  {path: 'lista-pagamentos/pagamento/:id', component: PagamentoComponent},
  {path: 'lista-pagamentos', component: ListaPagamentosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
