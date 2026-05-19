import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
}
