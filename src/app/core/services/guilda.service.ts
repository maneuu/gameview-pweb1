import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Guilda } from '../models/guilda.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GuildaService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/guilda`;
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  getAll(): Observable<Guilda[]> {
    return this.http.get<Guilda[]>(`${this.baseUrl}/all`);
  }

  // Busca a guilda do jogador.
  getByJogador(idJogador: number): Observable<Guilda[]> {
    return this.getAll().pipe(
      map((guildas) => guildas.filter((guilda) => guilda.fk_id_jogador === idJogador)),
    );
  }
}
