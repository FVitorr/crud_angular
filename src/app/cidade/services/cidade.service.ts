import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Cidade } from '../model/cidade';
import { delay, Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  private readonly API = 'api/cidade';
  constructor(private httpClient: HttpClient) {}

  findAll(){
    return  this.httpClient.get<Cidade[]>(this.API).pipe(
      take(1),
      tap(cidade => console.log(cidade))
    );
  }

  create(cidade: Cidade): Observable<Cidade> {
    return this.httpClient.post<Cidade>(this.API, cidade);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API}/${id}`);
  }

  update(cidade: Cidade): Observable<Cidade> {
    return this.httpClient.put<Cidade>(`${this.API}/${cidade.id}`, cidade);
  }
  
}
