import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { UsuariosService } from './../usuarios.service';
import { FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.scss']
})
export class ListaUsuarioComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: any =  [];
  headElements = ['nome', 'identidade', 'cpf', 'email', 'telefone', 'acoes'];
  searchText: string = '';
  previous: string;
  maxVisibleItems: number = 4;
  form: FormGroup;  

  constructor(
    private usuariosService: UsuariosService,
    private cdRef: ChangeDetectorRef)
    {
      this.form = new FormGroup({
        searchText: new FormControl()
     });
    }
  
  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText
  }

  ngOnInit() {
    this.usuariosService.listarUsuarios().subscribe(dados => {
      this.elements = dados;
      this.mdbTable.setDataSource(this.elements);
    });  
    this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
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
      nome: 'nome' + this.elements.length,
      identidade:'identidade' + this.elements.length,
      cpf: 'cpf' + this.elements.length,
      email: 'email' + this.elements.length,
      telefone: 'telefone' + this.elements.length
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
  this.usuariosService.listarUsuarios().subscribe(dados => this.elements = dados);
  }

  remove(id: any) {
    this.elements.splice(id, 1);
  }
}
