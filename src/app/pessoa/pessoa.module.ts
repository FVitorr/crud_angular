import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FormsModule } from '@angular/forms';

import { PessoaFormModule } from './pessoa-form/pessoa-form.module'; // Atualize o caminho se necessário

import { PessoaRoutingModule } from './pessoa-routing.module';
import { PessoaComponent } from './pessoa/pessoa.component';

@NgModule({
  declarations: [PessoaComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    PessoaRoutingModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    PessoaFormModule
  ]
})
export class PessoaModule { }
