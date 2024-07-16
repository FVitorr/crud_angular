import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../model/pessoa';
import { Cidade } from '../../cidade/model/cidade';
import { PessoaFormComponent } from '../pessoa-form/pessoa-form.component';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { CidadeService } from '../../cidade/services/cidade.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PessoaService } from '../services/pessoa.service';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.scss']
})
export class PessoaComponent implements OnInit {
  cidades$: Observable<Cidade[]>;
  pessoas$: Observable<Pessoa[]>;

  displayedColumns: string[] = ['id', 'nome', 'time', 'cpf', 'hobbie', 'cidade', 'action'];
  dataSource: Pessoa[] = [];

  editMode: { [key: number]: boolean } = {}; 
  editedPessoa: { [key: number]: Pessoa } = {}; 

  constructor(
    private dialog: MatDialog,
    private cidadeService: CidadeService,
    private snackBar: MatSnackBar,
    private pessoaService: PessoaService
  ) {
    this.cidades$ = this.cidadeService.findAll().pipe(
      catchError(error => {
        console.log(error);
        this.showErrorMessage('Erro ao carregar cidades.');
        return of([]);
      })
    );

    this.pessoas$ = this.pessoaService.findAll().pipe(
      catchError(error => {
        console.log(error);
        this.showErrorMessage('Erro ao carregar pessoas.');
        return of([]);
      })
    );
  }
  
  ngOnInit(): void {
    this.pessoas$.subscribe(pessoas => {
      this.dataSource = pessoas;
    });
  }

  onAdd() {
    const dialogRef = this.dialog.open(PessoaFormComponent, {
      width: '1000px',
      height: '400px'
    });

    dialogRef.afterClosed().subscribe((result: Pessoa | undefined) => {
      if (result) {
        this.pessoaService.create(result).subscribe(() => {
          this.pessoas$ = this.pessoaService.findAll().pipe(
            catchError(error => {
              console.log(error);
              this.showErrorMessage('Erro ao carregar pessoas.');
              return of([]);
            })
          );
        });
      }
    });
  }

  onDelete(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta pessoa?')) {
      this.pessoaService.delete(id).subscribe({
        next: () => {
          this.showSuccessMessage('Pessoa excluída com sucesso.');
          this.pessoas$ = this.pessoaService.findAll(); // Atualiza a lista após a exclusão
        },
        error: (err) => {
          this.showErrorMessage('Erro ao excluir pessoa.');
          console.error(err);
        }
      });
    }
  }

  onEdit(pessoa: Pessoa): void {
    this.editMode[pessoa.id] = !this.editMode[pessoa.id];
    if (this.editMode[pessoa.id]) {
      this.editedPessoa[pessoa.id] = { ...pessoa };
    }
  }

  onCancel(pessoa: Pessoa): void {
    this.editMode[pessoa.id] = false;
    delete this.editedPessoa[pessoa.id];
  }
  validateCPF(cpf: string): boolean {
    if (!this.isValidCPF(cpf)) {
      this.showErrorMessage('CPF invalido');
      return false
    }return true
  }

  onSave(pessoa: Pessoa): void {
    if (this.editedPessoa[pessoa.id] && this.validateCPF(this.editedPessoa[pessoa.id].cpf)) {
      
      this.pessoaService.update(pessoa.id, this.editedPessoa[pessoa.id]).subscribe({
        next: () => {
          this.showSuccessMessage('Pessoa atualizada com sucesso.');
          this.pessoas$ = this.pessoaService.findAll(); // Atualiza a lista após a edição
        },
        error: (err) => {
          this.showErrorMessage('Erro ao atualizar pessoa.');
          console.error(err);
        }
      });
      this.editMode[pessoa.id] = false;
    }
  }

  onCidadeChange(selectedId: string, pessoa: Pessoa): void {
    this.cidadeService.findAll().subscribe(cidades => {
      const selectedCidade = cidades.find(cidade => cidade.id.toString() === selectedId);
      console.log(selectedCidade)
      if (selectedCidade) {
        this.editedPessoa[pessoa.id].cidade = selectedCidade
      }
    });
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

  private showErrorMessage(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
