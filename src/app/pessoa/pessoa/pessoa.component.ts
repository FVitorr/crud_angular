import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../model/pessoa';
import { Cidade } from '../../cidade/model/cidade';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.scss']
})
export class PessoaComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'time', 'cpf', 'hobbie', 'cidade', 'action'];
  dataSource: Pessoa[] = [];

  editMode: { [key: number]: boolean } = {}; // Correção para usar 'number'
  editedCidade: { [key: number]: Cidade } = {}; // Para armazenar valores editados

  ngOnInit(): void {
    // Inicialize os dados aqui
    const CIDADES: Cidade[] = [
      { id: 1, cidade: 'São Paulo', estado: 'SP', populacao: 12300000 }
    ];

    this.dataSource = [
      {
        id: 1,
        nome: 'João Silva',
        time: 'Time A',
        cpf: '123.456.789-00',
        hobbie: 'Futebol',
        cidade: CIDADES[0]
      }
    ];
    console.log(this.dataSource); // Verifique se há dados
  }
}
