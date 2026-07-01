import { ChangeDetectionStrategy, Component, OnInit, inject, input, signal } from '@angular/core';

import { MissaoRegistro } from '../../../core/models/missao-registro.model';
import { MissaoRegistroService } from '../../../core/services/missao-registro.service';
import { MissaoService } from '../../../core/services/missao.service';

@Component({
  selector: 'app-tab-missions',
  standalone: true,
  imports: [],
  templateUrl: './tab-missions.html',
  styleUrls: ['./tab-missions.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabMissionsComponent implements OnInit {
  private readonly missaoRegistroService = inject(MissaoRegistroService);
  private readonly missaoService = inject(MissaoService);

  readonly playerId = input<number | null>(null);
  readonly missionsView = signal<{ mission: MissaoRegistro; nome: string; dificuldade: string }[]>(
    [],
  );
  readonly isLoading = signal(true);

  // Carrega ao iniciar
  ngOnInit(): void {
    this.carregarMissoes();
  }

  // Busca missoes e detalhes
  carregarMissoes(): void {
    const idJogador = this.playerId();
    if (idJogador === null) {
      this.missionsView.set([]);
      this.isLoading.set(false);
      return;
    }

    this.isLoading.set(true);
    this.missaoRegistroService.getByJogador(idJogador).subscribe({
      next: (registros) => {
        if (registros.length === 0) {
          this.missionsView.set([]);
          this.isLoading.set(false);
          return;
        }

        const ids = Array.from(new Set(registros.map((mission) => mission.fk_id_missao)));
        this.missaoService.getByIds(ids).subscribe({
          next: (missoes) => {
            this.missionsView.set(this.buildView(registros, missoes));
            this.isLoading.set(false);
          },
          error: () => {
            this.missionsView.set([]);
            this.isLoading.set(false);
          },
        });
      },
      error: () => {
        this.missionsView.set([]);
        this.isLoading.set(false);
      },
    });
  }

  // Monta o card com nome e dificuldade
  private buildView(
    registros: MissaoRegistro[],
    missoes: { idMissao: number; nomeMissao: string; dificuldade: string }[],
  ) {
    const map = new Map(missoes.map((m) => [m.idMissao, m]));
    return registros.map((mission) => {
      const missao = map.get(mission.fk_id_missao);
      return {
        mission,
        nome: missao?.nomeMissao || 'Missao',
        dificuldade: missao?.dificuldade || '-',
      };
    });
  }
}
