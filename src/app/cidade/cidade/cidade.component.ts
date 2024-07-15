import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, of } from 'rxjs';

import { CidadeFormComponent } from '../cidade-form/cidade-form.component';
import { Cidade } from '../model/cidade';
import { CidadeService } from '../services/cidade.service';

@Component({
  selector: 'app-cidade',
  templateUrl: './cidade.component.html',
  styleUrl: './cidade.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CidadeComponent {
  cidade$: Observable<Cidade[]> ;
  editMode: { [key: number]: boolean } = {}; // Correção para usar 'number'
  editedCidade: { [key: number]: Cidade } = {}; // Para armazenar valores editados

  //cidadeService: CidadeService;
  constructor(private cidadeService: CidadeService, private snackBar: MatSnackBar, private dialog: MatDialog ){
    //this.cidadeService = new CidadeService();
    this.cidade$ =  this.cidadeService.findAll().pipe(
      catchError(error => {
        console.log(error)
        this.showErrorMessage('Erro ao carregar cidades.');
        return of([]);
        
      })
    );
    
  }
  displayedColumns: string[] = ['id','cidade','estado','populacao','action']

  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,  // Duração da snackbar em milissegundos
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  onAdd(){
    const dialogRef = this.dialog.open(CidadeFormComponent, {
      width: '1000px'
    });

    dialogRef.afterClosed().subscribe((result: Cidade | undefined) => {
      if (result) {
        this.cidadeService.create(result).subscribe(() => {
          this.cidade$ = this.cidadeService.findAll().pipe(
            catchError(error => {
              console.log(error);
              this.showErrorMessage('Erro ao carregar cidades.');
              return of([]);
            })
          );
        });
      }
    });
  }

  onDelete(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta cidade?')) {
      this.cidadeService.delete(id).subscribe({
        next: () => {
          this.showSuccessMessage('Cidade excluída com sucesso.');
          this.cidade$ = this.cidadeService.findAll(); // Atualiza a lista após a exclusão
        },
        error: (err) => {
          this.showErrorMessage('Erro ao excluir cidade.');
          console.error(err);
        }
      });
    }
  }

  onEdit(cidade: Cidade): void {
    console.log('onEdit')
    this.editMode[cidade.id] = !this.editMode[cidade.id];
    if (this.editMode[cidade.id]) {
      // Store a copy of the original cidade for editing
      this.editedCidade[cidade.id] = { ...cidade };
    }
  }

  onCancel(cidade: Cidade): void {
    this.editMode[cidade.id] = false;
    delete this.editedCidade[cidade.id];
  }

  onSave(cidade: Cidade): void {
    if (this.editedCidade[cidade.id]) {
      this.cidadeService.update(this.editedCidade[cidade.id]).subscribe({
        next: () => {
          this.showSuccessMessage('Cidade atualizada com sucesso.');
          this.cidade$ = this.cidadeService.findAll(); // Atualiza a lista após a edição
        },
        error: (err) => {
          this.showErrorMessage('Erro ao atualizar cidade.');
          console.error(err);
        }
      });
      this.editMode[cidade.id] = false;
    }
  }

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
