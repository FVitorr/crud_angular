import { Component } from '@angular/core';
import { Pessoa } from '../model/pessoa';
import { Cidade } from '../../cidade/model/cidade';
import { MatDialogRef } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { CidadeService } from '../../cidade/services/cidade.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.scss']
})
export class PessoaFormComponent {
  cidade: Cidade = {id: 0,cidade: '',estado:'',populacao: 0}
  pessoa: Pessoa = { id: 0, nome: '', time: '', cpf: '',cidade: this.cidade,hobbie: '' };

  cidades$: Observable<Cidade[]> ;

  constructor(private cidadeService: CidadeService,private snackBar: MatSnackBar,public dialogRef: MatDialogRef<PessoaFormComponent>) {
    this.cidades$ =  this.cidadeService.findAll().pipe(
      catchError(error => {
        console.log(error)
        this.showErrorMessage('Erro ao carregar cidades.');
        return of([]);
        
      })
    );
  }


  onSave(): void {
    this.dialogRef.close(this.cidade);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,  // Duração da snackbar em milissegundos
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
