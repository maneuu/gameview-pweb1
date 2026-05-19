import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

import { Jogador } from '../models/jogador.model';
import { JogadorService } from './jogador.service';

export interface AuthResult {
  ok: boolean;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storageKey = 'gameview.auth.user';
  private readonly jogadorService = inject(JogadorService);
  private readonly userState = signal<Jogador | null>(null);

  readonly user = this.userState.asReadonly();
  readonly isLoggedIn = computed(() => this.userState() !== null);

  constructor() {
    this.restoreFromStorage();
  }

  login(idJogador: number, senha: string): Observable<AuthResult> {
    if (!idJogador || !senha.trim()) {
      return of({ ok: false, message: 'Preencha o ID e a senha.' });
    }

    return this.jogadorService.getById(idJogador).pipe(
      map((jogador) => {
        if (!jogador) {
          return { ok: false, message: 'Jogador nao encontrado.' };
        }

        if (jogador.senha !== senha) {
          return { ok: false, message: 'Senha incorreta.' };
        }

        this.setUser(jogador);
        return { ok: true };
      }),
      catchError(() => of({ ok: false, message: 'Erro ao autenticar. Tente novamente.' })),
    );
  }

  logout(): void {
    this.userState.set(null);
    localStorage.removeItem(this.storageKey);
  }

  private setUser(jogador: Jogador): void {
    const safeUser = this.sanitizeUser(jogador);
    this.userState.set(safeUser);
    localStorage.setItem(this.storageKey, JSON.stringify(safeUser));
  }

  private restoreFromStorage(): void {
    const stored = localStorage.getItem(this.storageKey);
    if (!stored) {
      return;
    }

    try {
      const jogador = JSON.parse(stored) as Jogador | null;
      if (jogador) {
        this.userState.set(this.sanitizeUser(jogador));
      }
    } catch {
      localStorage.removeItem(this.storageKey);
    }
  }

  private sanitizeUser(jogador: Jogador): Jogador {
    return { ...jogador, senha: '' };
  }
}
