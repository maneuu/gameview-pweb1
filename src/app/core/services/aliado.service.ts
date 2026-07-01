import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aliado } from '../models/aliado.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AliadoService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/aliado`;
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  getAll(): Observable<Aliado[]> {
    return this.http.get<Aliado[]>(`${this.baseUrl}/all`);
  }

  getByJogador(idJogador: number): Observable<Aliado[]> {
    return this.http.get<Aliado[]>(`${this.baseUrl}/get/jogador/${idJogador}`);
  }

  create(data: Partial<Aliado>): Observable<Aliado> {
    return this.http.post<Aliado>(`${this.baseUrl}/create`, data, { headers: this.headers });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
