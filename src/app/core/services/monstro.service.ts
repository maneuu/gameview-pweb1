import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Monstro } from '../models/monstro.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MonstroService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.supabaseUrl}/rest/v1/monstro`;
  private readonly headers = new HttpHeaders({
    apikey: environment.supabaseKey,
    Authorization: `Bearer ${environment.supabaseKey}`,
    'Content-Type': 'application/json',
  });

  getAll(): Observable<Monstro[]> {
    return this.http.get<Monstro[]>(this.baseUrl, { headers: this.headers });
  }

  getByIds(ids: number[]): Observable<Monstro[]> {
    if (ids.length === 0) {
      return of([]);
    }

    const idList = ids.join(',');
    const url = `${this.baseUrl}?id_monstro=in.(${idList})`;
    return this.http.get<Monstro[]>(url, { headers: this.headers });
  }
}
