import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PagamentosService } from './../pagamentos.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss'],
  providers: [PagamentosService]
})
export class PagamentoComponent implements OnInit {

  form: FormGroup;  
  constructor(
    private fb: FormBuilder, 
    private pagamentoService: PagamentosService,
    private route: ActivatedRoute


    ){ }

  ngOnInit(){
    this.route.params.subscribe(
      (params:any) =>{
        const id = params.id
        console.log(id);  
        const pagamento$ = this.pagamentoService.buscaPagamentoById(id);
        pagamento$.subscribe(pagamento =>{
          this.updateForm(pagamento);
        })
      }
    )

    this.form = this.fb.group({
      id:[null],
      nome:[null],
      cpf:[null],
      mesReferencia:[null],      
      dataVencimento:[null],
      dataPagamento:[null],
      juros:[null],
      multa:[null],
      desconto:[null],
      valorPago:[null],
      meioPagamento:[null],
      status:[null]
    });
  }

  updateForm(pagamento){
    this.form.patchValue({
      id: pagamento.id,
      nome: pagamento.nome,
      cpf: pagamento.cpf,
      mesReferencia:pagamento.mesReferencia,      
      dataVencimento:pagamento.dataVencimento,
      dataPagamento:pagamento.dataPagamento,
      juros:pagamento.juros,
      multa:pagamento.multa,
      desconto:pagamento.desconto,
      valorPago:pagamento.valorPago,
      meioPagamento:pagamento.meioPagamento,
      status:pagamento.status
    })
  }

  submit(){
    console.log(this.form.value);
    if (this.form.valid){
      if(this.form.value.id){
        this.pagamentoService.salvaPagamento(this.form.value).subscribe(
          success =>alert('Pagamento Informado'),
          error =>alert('Deu B.O.'),
          () => console.log('completo'),
          );
          //reseta o form
          this.form.reset(); 
        }
        else {
        this.pagamentoService.incluirPagamento(this.form.value).subscribe(
          success =>alert('Incluído com Sucesso'),
          error =>alert('Desculpe, algo de errado aconteceu, tente novamente.'),
          () => console.log('Algum erro'),
          );
          //reseta o form
          this.form.reset();
      }
    }
  }
}