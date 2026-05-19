import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
}
