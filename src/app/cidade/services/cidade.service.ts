import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Cidade } from '../model/cidade';
import { catchError, delay, Observable, take, tap, throwError } from 'rxjs';

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
    return this.httpClient.delete<void>(`${this.API}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  update(cidade: Cidade): Observable<Cidade> {
    return this.httpClient.put<Cidade>(`${this.API}/${cidade.id}`, cidade);
  }
  

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
