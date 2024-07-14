import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CidadeFormModule } from './cidade-form/cidade-form.module'; // Certifique-se de que o caminho está correto
import { CidadeComponent } from './cidade/cidade.component';
import { CidadeRoutingModule } from './cidade-routing.module';

@NgModule({
  declarations: [CidadeComponent],
  imports: [
    CommonModule,
    CidadeRoutingModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CidadeFormModule // Importa o módulo de formulário
  ]
})
export class CidadeModule { }
