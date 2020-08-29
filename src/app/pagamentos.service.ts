import { pipe } from 'rxjs';
import { take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PagamentosService {

  pagamentoUrl = 'http://localhost:3000/pagamentos';

  constructor(
    private http: HttpClient ) { }

  listarPagamentos(){
    return this.http.get<any[]>(`${this.pagamentoUrl}`);
  }

  incluirPagamento(pagamento){
    return this.http.post(this.pagamentoUrl, pagamento);
  }
  buscaPagamentoById(id){
    return this.http.get(`${this.pagamentoUrl}/${id}`).pipe(take(1));;
  }
  //buscaPagamento(pagamento){
    //return this.http.get(`${this.pagamentoUrl}/${pagamento.id}`, pagamento).pipe(take(1));
 // }
  salvaPagamento(pagamento){
    return this.http.put(`${this.pagamentoUrl}/${pagamento.id}`, pagamento).pipe(take(1));
  }

}
