import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BatalhaRegistro } from '../models/batalha-registro.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BatalhaRegistroService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.supabaseUrl}/rest/v1/batalharegistro`;
  private readonly headers = new HttpHeaders({
    apikey: environment.supabaseKey,
    Authorization: `Bearer ${environment.supabaseKey}`,
    'Content-Type': 'application/json',
  });

  getAll(): Observable<BatalhaRegistro[]> {
    return this.http.get<BatalhaRegistro[]>(this.baseUrl, { headers: this.headers });
  }
}
