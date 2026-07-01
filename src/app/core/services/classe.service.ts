import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Classe } from '../models/classe.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ClasseService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/classe`;
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  getAll(): Observable<Classe[]> {
    return this.http.get<Classe[]>(`${this.baseUrl}/all`);
  }
}
