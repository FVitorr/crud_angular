import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CidadeFormComponent } from './cidade-form.component'; // Atualize com o caminho correto

@NgModule({
  declarations: [CidadeFormComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule // Adiciona FormsModule para suporte ao ngModel
  ],
  exports: [CidadeFormComponent]
})
export class CidadeFormModule { }
