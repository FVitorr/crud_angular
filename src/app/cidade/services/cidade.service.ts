import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Cidade } from '../model/cidade';
import { delay, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  private readonly API = './publics/cidade.json';
  constructor(private httpClient: HttpClient) {}

  findAll(){
    return  this.httpClient.get<Cidade[]>(this.API).pipe(
      take(1),
      delay(5000),
      tap(cidade => console.log(cidade))
    );
  }

  nCidade(){

  }
}
