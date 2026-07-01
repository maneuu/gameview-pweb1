import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MissaoRegistro } from '../models/missao-registro.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MissaoRegistroService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/missaoregistro`;
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  getAll(): Observable<MissaoRegistro[]> {
    return this.http.get<MissaoRegistro[]>(`${this.baseUrl}/all`);
  }

  getByJogador(idJogador: number): Observable<MissaoRegistro[]> {
    return this.http.get<MissaoRegistro[]>(`${this.baseUrl}/get/jogador/${idJogador}`);
  }
}
