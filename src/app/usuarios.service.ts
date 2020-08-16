import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pipe } from 'rxjs';

@Injectable()
export class UsuariosService {

  usuariosUrl = 'http://localhost:3000/usuarios';

  constructor(
    private http: HttpClient ) { }

  listarUsuarios(){
    return this.http.get<any[]>(`${this.usuariosUrl}`);
  }
  cadastrar(usuario){
    return this.http.post(this.usuariosUrl, usuario);
    }
}
