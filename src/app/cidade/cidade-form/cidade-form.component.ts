import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Cidade } from '../model/cidade'; // Atualize o caminho conforme necessário


@Component({
  selector: 'app-cidade-form',
  templateUrl: './cidade-form.component.html',
  styleUrls: ['./cidade-form.component.scss']
})
export class CidadeFormComponent {
  cidade: Cidade = { id: 0, cidade: '', estado: '', populacao: 0 };

  constructor(public dialogRef: MatDialogRef<CidadeFormComponent>) {}

  onSave(): void {
    this.dialogRef.close(this.cidade);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
