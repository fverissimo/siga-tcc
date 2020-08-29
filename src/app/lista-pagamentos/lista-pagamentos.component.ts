import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { PagamentosService } from './../pagamentos.service';
import { FormGroup, FormControl} from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-lista-pagamentos',
  templateUrl: './lista-pagamentos.component.html',
  styleUrls: ['./lista-pagamentos.component.scss'],
  providers: [PagamentosService]
})
export class ListaPagamentosComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: any =  [];
  headElements = ['mesRefrencia', 'dataVencimento', 'valor', 'desconto', 'multa', 'valorPago', 'meioPagamento', 'acoes'];
  searchText: string = '';
  previous: string;
  maxVisibleItems: number = 8;
  form: FormGroup;  

  constructor(
    private pagamentosService: PagamentosService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
    
    )
    {
      this.form = new FormGroup({
        searchText: new FormControl()
     });
    }
  
  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText
  }

  ngOnInit() {
    this.pagamentosService.listarPagamentos().subscribe(dados => {
      this.elements = dados;
      this.mdbTable.setDataSource(this.elements);
    });  
    this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();

  }

  onEdit(id){
    this.router.navigate(['pagamento', id], {relativeTo: this.route});
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  addNewRow() {
    this.mdbTable.addRow({
      id: this.elements.length.toString(),
      mesReferencia: 'mesRefrencia' + this.elements.length,
      dataVencimento:'dataVencimento' + this.elements.length,
      valor: 'valor' + this.elements.length,
      desconto: 'desconto' + this.elements.length,
      multa: 'multa' + this.elements.length,
      valorPago: 'valorPago' + this.elements.length,
      meioPagamento: 'meioPagamento' + this.elements.length,
      status: 'status' + this.elements.length
    });
    this.emitDataSourceChange();
  }

  addNewRowAfter() {
    this.mdbTable.getDataSource().forEach((el: any, index: any) => {
      el.id = (index + 1).toString();
    });
    this.emitDataSourceChange();
  }

  removeLastRow() {
    this.mdbTable.removeLastRow();
    this.emitDataSourceChange();
    this.mdbTable.rowRemoved().subscribe((data: any) => {
      console.log(data);
    });
  }

  removeRow() {
    this.mdbTable.removeRow(1);
    this.mdbTable.getDataSource().forEach((el: any, index: any) => {
      el.id = (index + 1).toString();
    });
    this.emitDataSourceChange();
    this.mdbTable.rowRemoved().subscribe((data: any) => {
      console.log(data);
    });
  }

  emitDataSourceChange() {
    this.mdbTable.dataSourceChange().subscribe((data: any) => {
      console.log(data);
    });
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    this.elements = this.mdbTable.searchLocalDataByMultipleFields(this.searchText, ['cpf', 'nome']);
    this.mdbTable.setDataSource(prev);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
    });
  }

  lista(){
  this.pagamentosService.listarPagamentos().subscribe(dados => this.elements = dados);
  }

  remove(id: any) {
    this.elements.splice(id, 1);
  }

}
