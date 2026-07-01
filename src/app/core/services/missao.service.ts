import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { Missao } from '../models/missao.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MissaoService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/missao`;
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  getAll(): Observable<Missao[]> {
    return this.http.get<Missao[]>(`${this.baseUrl}/all`);
  }

  getByIds(ids: number[]): Observable<Missao[]> {
    if (ids.length === 0) {
      return of([]);
    }

    return this.getAll().pipe(
      map((missoes) => missoes.filter((missao) => ids.includes(missao.idMissao))),
    );
  }
}
