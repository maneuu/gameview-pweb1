import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MissaoRegistro } from '../models/missao-registro.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MissaoRegistroService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.supabaseUrl}/rest/v1/missaoregistro`;
  private readonly headers = new HttpHeaders({
    apikey: environment.supabaseKey,
    Authorization: `Bearer ${environment.supabaseKey}`,
    'Content-Type': 'application/json',
  });

  getAll(): Observable<MissaoRegistro[]> {
    return this.http.get<MissaoRegistro[]>(this.baseUrl, { headers: this.headers });
  }

  getByJogador(idJogador: number): Observable<MissaoRegistro[]> {
    const url = `${this.baseUrl}?fk_id_jogador=eq.${idJogador}`;
    return this.http.get<MissaoRegistro[]>(url, { headers: this.headers });
  }
}
