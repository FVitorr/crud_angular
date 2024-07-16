import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pessoa } from '../model/pessoa';
import { Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  private readonly API = 'api/pessoa'
  constructor(private httpClient: HttpClient) { }

  findAll(){
    return this.httpClient.get<Pessoa[]>(
      this.API).pipe(
        take(1),
        tap(pessoa => console.log(pessoa))
      );
  }
  create(pessoa: Pessoa): Observable<Pessoa> {
    return this.httpClient.post<Pessoa>(this.API, pessoa).pipe(
      take(1),
      tap(newPessoa => console.log(newPessoa))
    );
  }

  update(id: number, pessoa: Pessoa): Observable<void> {
    return this.httpClient.put<void>(`${this.API}/${id}`, pessoa).pipe(
      take(1),
      tap(() => console.log(`Pessoa com ID ${id} atualizada`))
    );
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API}/${id}`).pipe(
      take(1),
      tap(() => console.log(`Pessoa com ID ${id} excluída`))
    );
  }
  
}
