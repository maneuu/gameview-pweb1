import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guilda } from '../models/guilda.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GuildaService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.supabaseUrl}/rest/v1/guilda`;
  private readonly headers = new HttpHeaders({
    apikey: environment.supabaseKey,
    Authorization: `Bearer ${environment.supabaseKey}`,
    'Content-Type': 'application/json',
  });

  getAll(): Observable<Guilda[]> {
    return this.http.get<Guilda[]>(this.baseUrl, { headers: this.headers });
  }

  // Busca a guilda do jogador.
  getByJogador(idJogador: number): Observable<Guilda[]> {
    const url = `${this.baseUrl}?fk_id_jogador=eq.${idJogador}`;
    return this.http.get<Guilda[]>(url, { headers: this.headers });
  }
}
