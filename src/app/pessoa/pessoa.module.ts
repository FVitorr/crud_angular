import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

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
    MatIconModule
  ]
})
export class PessoaModule { }
