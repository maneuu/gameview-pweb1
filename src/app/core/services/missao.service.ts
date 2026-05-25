import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Missao } from '../models/missao.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MissaoService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.supabaseUrl}/rest/v1/missao`;
  private readonly headers = new HttpHeaders({
    apikey: environment.supabaseKey,
    Authorization: `Bearer ${environment.supabaseKey}`,
    'Content-Type': 'application/json',
  });

  getAll(): Observable<Missao[]> {
    return this.http.get<Missao[]>(this.baseUrl, { headers: this.headers });
  }

  getByIds(ids: number[]): Observable<Missao[]> {
    if (ids.length === 0) {
      return of([]);
    }

    const idList = ids.join(',');
    const url = `${this.baseUrl}?id_missao=in.(${idList})`;
    return this.http.get<Missao[]>(url, { headers: this.headers });
  }
}
