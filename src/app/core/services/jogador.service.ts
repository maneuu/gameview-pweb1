import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { Jogador } from '../models/jogador.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class JogadorService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.supabaseUrl}/rest/v1/jogador`;
  private readonly headers = new HttpHeaders({
    apikey: environment.supabaseKey,
    Authorization: `Bearer ${environment.supabaseKey}`,
    'Content-Type': 'application/json',
  });

  getAll(): Observable<Jogador[]> {
    return this.http.get<Jogador[]>(this.baseUrl, { headers: this.headers });
  }

  getTop10ByPontuacao(): Observable<Jogador[]> {
    const url = `${this.baseUrl}?select=*&order=pontuacao.desc&limit=10`;
    return this.http.get<Jogador[]>(url, { headers: this.headers });
  }

  getById(idJogador: number): Observable<Jogador | null> {
    const url = `${this.baseUrl}?select=*&id_jogador=eq.${idJogador}&limit=1`;
    return this.http
      .get<Jogador[]>(url, { headers: this.headers })
      .pipe(map((jogadores) => jogadores[0] ?? null));
  }

  getByIds(ids: number[]): Observable<Jogador[]> {
    if (ids.length === 0) {
      return of([]);
    }

    const idList = ids.join(',');
    const url = `${this.baseUrl}?select=*&id_jogador=in.(${idList})`;
    return this.http.get<Jogador[]>(url, { headers: this.headers });
  }

  create(jogador: Partial<Jogador>): Observable<Jogador> {
    // O cabeçalho 'Prefer: return=representation' força o Supabase a devolver a linha inserida
    const headers = this.headers.set('Prefer', 'return=representation');
    
    return this.http
      .post<Jogador[]>(this.baseUrl, jogador, { headers })
      .pipe(map((jogadores) => jogadores[0]));
  }

  getByNome(nome: string): Observable<Jogador[]> {
    const url = `${this.baseUrl}?select=*&nome_usuario=ilike.*${nome}*`;

    return this.http.get<Jogador[]>(url, {
      headers: this.headers,
    });
  }
}