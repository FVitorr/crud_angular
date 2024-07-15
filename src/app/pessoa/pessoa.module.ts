import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { PessoaFormModule } from './pessoa-form/pessoa-form.module';
import { PessoaRoutingModule } from './pessoa-routing.module';
import { PessoaComponent } from './pessoa/pessoa.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    PessoaFormModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ]
})
export class PessoaModule { }
