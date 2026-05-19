import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
}
