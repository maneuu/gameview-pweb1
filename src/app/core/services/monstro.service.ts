import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { Monstro } from '../models/monstro.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MonstroService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/monstro`;
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  getAll(): Observable<Monstro[]> {
    return this.http.get<Monstro[]>(`${this.baseUrl}/all`);
  }

  getByIds(ids: number[]): Observable<Monstro[]> {
    if (ids.length === 0) {
      return of([]);
    }

    return this.getAll().pipe(
      map((monstros) => monstros.filter((monstro) => ids.includes(monstro.idMonstro))),
    );
  }
}
