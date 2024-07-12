import { Component } from '@angular/core';

import { Cidade } from '../model/cidade';
import { CidadeService } from '../services/cidade.service';
import { catchError, Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cidade',
  templateUrl: './cidade.component.html',
  styleUrl: './cidade.component.scss'
})
export class CidadeComponent {
  cidade$: Observable<Cidade[]> ;

  //cidadeService: CidadeService;
  constructor(private cidadeService: CidadeService, private snackBar: MatSnackBar){
    //this.cidadeService = new CidadeService();
    this.cidade$ =  this.cidadeService.findAll().pipe(
      catchError(error => {
        console.log(error)
        this.showErrorMessage('Erro ao carregar cidades.');
        return of([]);
        
      })
    );
    
  }
  displayedColumns: string[] = ['id','cidade','estado','populacao']

  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,  // Duração da snackbar em milissegundos
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
