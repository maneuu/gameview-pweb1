import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Personagem } from '../models/personagem.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PersonagemService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/personagem`;
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  getAll(): Observable<Personagem[]> {
    return this.http.get<Personagem[]>(`${this.baseUrl}/all`);
  }

  getByJogador(idJogador: number): Observable<Personagem[]> {
    return this.getAll().pipe(
      map((personagens) =>
        personagens.filter((personagem) => personagem.fk_id_jogador === idJogador),
      ),
    );
  }

  create(data: Personagem): Observable<Personagem> {
    return this.http.post<Personagem>(`${this.baseUrl}/create`, data, { headers: this.headers });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
