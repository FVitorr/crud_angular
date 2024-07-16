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
    if (this.validateCPF(this.pessoa.cpf)){
      this.dialogRef.close(this.pessoa);
    }
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

  validateCPF(cpf: string): boolean {
    if (!this.isValidCPF(cpf)) {
      this.showErrorMessage('CPF invalido');
      return false
    }return true
  }

  private isValidCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false; // CPF inválido se todos os dígitos forem iguais
    }

    const digits = cpf.split('').map(Number);
    const checkDigit = (weight: number[]) => {
      const sum = weight.reduce((acc, val, idx) => acc + val * digits[idx], 0);
      const remainder = (sum * 10) % 11;
      return remainder === 10 ? 0 : remainder;
    };

    return digits[9] === checkDigit([...Array(9).keys()].map(i => 10 - i)) &&
           digits[10] === checkDigit([...Array(10).keys()].map(i => 11 - i));
  }

}
