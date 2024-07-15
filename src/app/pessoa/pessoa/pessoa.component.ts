import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../model/pessoa';
import { Cidade } from '../../cidade/model/cidade';
import { PessoaFormComponent } from '../pessoa-form/pessoa-form.component';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { CidadeService } from '../../cidade/services/cidade.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.scss']
})
export class PessoaComponent implements OnInit {
  cidades$: Observable<Cidade[]> ;
  displayedColumns: string[] = ['id', 'nome', 'time', 'cpf', 'hobbie', 'cidade', 'action'];
  dataSource: Pessoa[] = [];

  editMode: { [key: number]: boolean } = {}; 
  editedPessoa: { [key: number]: Pessoa } = {}; 

  constructor(private dialog: MatDialog,private cidadeService: CidadeService,private snackBar: MatSnackBar){
    this.cidades$ =  this.cidadeService.findAll().pipe(
      catchError(error => {
        console.log(error)
        this.showErrorMessage('Erro ao carregar cidades.');
        return of([]);
        
      })
    );
  }
  
  ngOnInit(): void {
    // Inicialize os dados aqui
    const CIDADES: Cidade[] = [
      { id: 1, cidade: 'São Paulo', estado: 'SP', populacao: 12300000 }
    ];

    this.dataSource = [
      {
        id: 1,
        nome: 'João Silva',
        time: 'Time A',
        cpf: '123.456.789-00',
        hobbie: 'Futebol',
        cidade: CIDADES[0]
      }
    ];
    console.log(this.dataSource); // Verifique se há dados
  }


  onAdd(){
    const dialogRef = this.dialog.open(PessoaFormComponent, {
      width: '1000px',
      height: '400px'
    });

    dialogRef.afterClosed().subscribe((result: Cidade | undefined) => {
      if (result) {
        console.log("OKAY")
      }
    });
  }

  onEdit(pessoa: Pessoa): void {
    console.log('onEdit')
    this.editMode[pessoa.id] = !this.editMode[pessoa.id];
    if (this.editMode[pessoa.id]) {
      // Store a copy of the original pessoa for editing
      this.editedPessoa[pessoa.id] = { ...pessoa };
    }
  }

  
  onCancel(cidade: Cidade): void {
    this.editMode[cidade.id] = false;
    delete this.editedPessoa[cidade.id];
  }

  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,  // Duração da snackbar em milissegundos
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
  onCidadeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    console.log('Selected cidade:', selectedValue);
    // Faça algo com o valor selecionado, por exemplo, atualizar o modelo ou enviar uma solicitação
  }
}
