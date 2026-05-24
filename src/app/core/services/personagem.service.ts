import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personagem } from '../models/personagem.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PersonagemService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.supabaseUrl}/rest/v1/personagem`;
  private readonly headers = new HttpHeaders({
    apikey: environment.supabaseKey,
    Authorization: `Bearer ${environment.supabaseKey}`,
    'Content-Type': 'application/json',
  });

  getAll(): Observable<Personagem[]> {
    return this.http.get<Personagem[]>(this.baseUrl, { headers: this.headers });
  }

  getByJogador(idJogador: number): Observable<Personagem[]> {
    const url = `${this.baseUrl}?fk_id_jogador=eq.${idJogador}`;
    return this.http.get<Personagem[]>(url, { headers: this.headers });
  }

  create(data: Personagem): Observable<Personagem> {
    return this.http.post<Personagem>(this.baseUrl, data, { headers: this.headers });
  }

  delete(id: number): Observable<void> {
    const url = `${this.baseUrl}?id_personagem=eq.${id}`;
    return this.http.delete<void>(url, { headers: this.headers });
  }
}
