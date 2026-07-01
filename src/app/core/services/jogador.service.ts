import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { Jogador } from '../models/jogador.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class JogadorService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/jogador`;
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  getAll(): Observable<Jogador[]> {
    return this.http.get<Jogador[]>(`${this.baseUrl}/all`);
  }

  getTop10ByPontuacao(): Observable<Jogador[]> {
    return this.http.get<Jogador[]>(`${this.baseUrl}/top10`);
  }

  getById(idJogador: number): Observable<Jogador | null> {
    return this.http.get<Jogador>(`${this.baseUrl}/get/${idJogador}`);
  }

  getByIds(ids: number[]): Observable<Jogador[]> {
    if (ids.length === 0) {
      return of([]);
    }

    return this.getAll().pipe(
      map((jogadores) => jogadores.filter((jogador) => ids.includes(jogador.idJogador))),
    );
  }

  create(jogador: Partial<Jogador>): Observable<Jogador> {
    return this.http.post<Jogador>(`${this.baseUrl}/create`, jogador, { headers: this.headers });
  }

  getByNome(nome: string): Observable<Jogador[]> {
    return this.http.get<Jogador[]>(`${this.baseUrl}/get/nome/${encodeURIComponent(nome.trim())}`);
  }
}
