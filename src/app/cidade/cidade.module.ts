import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CidadeRoutingModule } from './cidade-routing.module';
import { CidadeComponent } from './cidade/cidade.component';


@NgModule({
  declarations: [
    CidadeComponent
  ],
  imports: [
    CommonModule,
    CidadeRoutingModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinner
  ]
})
export class CidadeModule { }
