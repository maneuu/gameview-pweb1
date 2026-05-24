import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Jogador } from '../../core/models/jogador.model';
import { JogadorService } from '../../core/services/jogador.service';
import { PlayerOverviewComponent } from '../../shared/components/player-overview/player-overview';

@Component({
  selector: 'PlayerProfileComponent',
  standalone: true,
  imports: [PlayerOverviewComponent],
  templateUrl: './player-profile.html',
  styleUrl: './player-profile.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerProfileComponent implements OnInit {
  private readonly storageKey = 'gameview.auth.user';
  private readonly route = inject(ActivatedRoute);
  private readonly jogadorService = inject(JogadorService);

  readonly player = signal<Jogador | null>(null);
  readonly isLoading = signal(true);
  readonly isOwner = signal(false);

  ngOnInit(): void {
    // Carrega o jogador pela rota e define o owner.
    const idJogador = Number(this.route.snapshot.paramMap.get('id'));
    const storedId = this.getStoredUserId();

    // Cancela se o ID for inválido (NaN, 0 ou nulo)
    if (!idJogador) {
      this.isLoading.set(false);
      return;
    }

    this.jogadorService.getById(idJogador).subscribe({
      next: (player) => {
        // Atualiza o perfil do jogador.
        this.player.set(player);
        this.isOwner.set(Boolean(player && storedId === player.id_jogador));
        this.isLoading.set(false);
      },
      error: () => {
        this.player.set(null);
        this.isOwner.set(false);
        this.isLoading.set(false);
      },
    });
  }

  // Le o ID do jogador salvo no localStorage.
  private getStoredUserId(): number | null {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      return null;
    }

    try {
      const parsed = JSON.parse(raw) as { id_jogador?: number } | null;
      return typeof parsed?.id_jogador === 'number' ? parsed.id_jogador : null;
    } catch {
      return null;
    }
  }
}
