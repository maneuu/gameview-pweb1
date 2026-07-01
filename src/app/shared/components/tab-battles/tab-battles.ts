import { ChangeDetectionStrategy, Component, OnInit, inject, input, signal } from '@angular/core';

import { BatalhaRegistro } from '../../../core/models/batalha-registro.model';
import { BatalhaRegistroService } from '../../../core/services/batalha-registro.service';
import { MonstroService } from '../../../core/services/monstro.service';

@Component({
  selector: 'app-tab-battles',
  standalone: true,
  imports: [],
  templateUrl: './tab-battles.html',
  styleUrls: ['./tab-battles.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabBattlesComponent implements OnInit {
  private readonly batalhaRegistroService = inject(BatalhaRegistroService);
  private readonly monstroService = inject(MonstroService);

  readonly playerId = input<number | null>(null);
  readonly battlesView = signal<{ battle: BatalhaRegistro; nome: string; tipo: string }[]>([]);
  readonly isLoading = signal(true);

  // Carrega ao iniciar
  ngOnInit(): void {
    this.carregarBatalhas();
  }

  // Busca batalhas e nomes de monstros
  carregarBatalhas(): void {
    const idJogador = this.playerId();
    if (idJogador === null) {
      this.battlesView.set([]);
      this.isLoading.set(false);
      return;
    }

    this.isLoading.set(true);
    this.batalhaRegistroService.getByJogador(idJogador).subscribe({
      next: (registros) => {
        if (registros.length === 0) {
          this.battlesView.set([]);
          this.isLoading.set(false);
          return;
        }

        const ids = Array.from(new Set(registros.map((battle) => battle.fk_id_monstro)));
        this.monstroService.getByIds(ids).subscribe({
          next: (monstros) => {
            this.battlesView.set(this.buildView(registros, monstros));
            this.isLoading.set(false);
          },
          error: () => {
            this.battlesView.set([]);
            this.isLoading.set(false);
          },
        });
      },
      error: () => {
        this.battlesView.set([]);
        this.isLoading.set(false);
      },
    });
  }

  // Monta o card com nome e tipo
  private buildView(
    registros: BatalhaRegistro[],
    monstros: { idMonstro: number; nomeMonstro: string; tipo: string }[],
  ) {
    const map = new Map(monstros.map((m) => [m.idMonstro, m]));
    return registros.map((battle) => {
      const monstro = map.get(battle.fk_id_monstro);
      return {
        battle,
        nome: monstro?.nomeMonstro || 'Monstro',
        tipo: monstro?.tipo || '-',
      };
    });
  }
}
