import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PessoaFormComponent } from './pessoa-form.component'; // Atualize o caminho se necessário
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    PessoaFormComponent 
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule
  ],
  exports: [
    PessoaFormComponent 
  ]
})
export class PessoaFormModule { }
