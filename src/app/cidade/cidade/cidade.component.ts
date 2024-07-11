import { Component } from '@angular/core';

import { Cidade } from '../model/cidade';
import { CidadeService } from '../services/cidade.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cidade',
  templateUrl: './cidade.component.html',
  styleUrl: './cidade.component.scss'
})
export class CidadeComponent {
  cidade$: Observable<Cidade[]> ;

  //cidadeService: CidadeService;
  constructor(private cidadeService: CidadeService){
    //this.cidadeService = new CidadeService();
    this.cidade$ =  this.cidadeService.findAll();
  }


  displayedColumns: string[] = ['id','cidade','estado','populacao']
}
