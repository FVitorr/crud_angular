import { Component } from '@angular/core';
import { Pessoa } from '../model/pessoa';
import { Cidade } from '../../cidade/model/cidade';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.scss']
})
export class PessoaFormComponent {
  cidade: Cidade = {id: 0,cidade: '',estado:'',populacao: 0}
  pessoa: Pessoa = { id: 0, nome: '', time: '', cpf: '',cidade: this.cidade,hobbie: '' };

  constructor(public dialogRef: MatDialogRef<PessoaFormComponent>) {}

  onSave(): void {
    this.dialogRef.close(this.cidade);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
