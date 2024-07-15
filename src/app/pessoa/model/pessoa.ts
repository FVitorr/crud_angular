import { Cidade } from '../../cidade/model/cidade';
export interface Pessoa {
  id: number;
  nome: string;
  time: string;
  cpf: string;
  hobbie: string;
  cidade: Cidade;
}
