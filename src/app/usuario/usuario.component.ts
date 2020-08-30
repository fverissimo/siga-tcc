import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './../usuarios.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  form: FormGroup;  

  constructor(
    private fb: FormBuilder, 
    private usuarioService: UsuariosService,
    ){ }

  ngOnInit(){
    this.form = this.fb.group({
      nome:[null,[Validators.required, Validators.minLength, Validators.maxLength]],
      telefone:[null],
      identidade:[null],
      cpf:[null,[Validators.required]],
      email:[null,[Validators.required]],
      logradouro:[],
      numero:[],
      bairro:[],
      cidade:[],
      uf:[]
    });
  }
  submit(){
    console.log(this.form.value);
    if (this.form.valid){
      console.log('foi');
      this.usuarioService.cadastrar(this.form.value).subscribe(
      success =>alert('Gravado com Sucesso'),
      error =>alert('Deu B.O.'),
      () => console.log('completo'),
      );
      //reseta o form
      this.form.reset();
    }
  }
}
