import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aliado } from '../models/aliado.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AliadoService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.supabaseUrl}/rest/v1/aliado`;
  private readonly headers = new HttpHeaders({
    apikey: environment.supabaseKey,
    Authorization: `Bearer ${environment.supabaseKey}`,
    'Content-Type': 'application/json',
  });

  getAll(): Observable<Aliado[]> {
    return this.http.get<Aliado[]>(this.baseUrl, { headers: this.headers });
  }

  create(data: Aliado): Observable<Aliado> {
    return this.http.post<Aliado>(this.baseUrl, data, { headers: this.headers });
  }

  delete(fk_id_jogador: number, fk_id_jogador_aliado: number): Observable<void> {
    const url = `${this.baseUrl}?fk_id_jogador=eq.${fk_id_jogador}&fk_id_jogador_aliado=eq.${fk_id_jogador_aliado}`;
    return this.http.delete<void>(url, { headers: this.headers });
  }
}
