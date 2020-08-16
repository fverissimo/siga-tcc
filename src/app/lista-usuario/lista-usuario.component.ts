import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './../usuarios.service';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.scss']
})
export class ListaUsuarioComponent implements OnInit {

usuarios: Array<any>;

  constructor(private usuariosService: UsuariosService){
    
  }

  ngOnInit(){
    this.listar();
  }
  listar(){
    this.usuariosService.listarUsuarios().subscribe(dados => this.usuarios = dados);
  }
}
