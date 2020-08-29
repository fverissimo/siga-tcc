import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ListaUsuarioComponent } from './lista-usuario/lista-usuario.component';
import { UsuariosService} from './usuarios.service';
import { AppHeaderComponent } from './app-header/app-header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { PagamentoComponent } from './pagamento/pagamento.component';
import { ListaPagamentosComponent } from './lista-pagamentos/lista-pagamentos.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    ListaUsuarioComponent,
    AppHeaderComponent,
    SideMenuComponent,
    PagamentoComponent,
    ListaPagamentosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [UsuariosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
