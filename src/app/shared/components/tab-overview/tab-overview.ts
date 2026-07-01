import { ChangeDetectionStrategy, Component, OnInit, inject, input, signal } from '@angular/core';

import { Guilda } from '../../../core/models/guilda.model';
import { Jogador } from '../../../core/models/jogador.model';
import { GuildaService } from '../../../core/services/guilda.service';

@Component({
  selector: 'app-tab-overview',
  standalone: true,
  imports: [],
  templateUrl: './tab-overview.html',
  styleUrls: ['./tab-overview.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabOverviewComponent implements OnInit {
  private readonly guildaService = inject(GuildaService);

  readonly player = input<Jogador | null>(null);
  readonly guilda = signal<Guilda | null>(null);
  readonly isLoading = signal(true);

  ngOnInit(): void {
    // Carrega a guilda do jogador.
    const idJogador = this.player()?.idJogador ?? null;
    if (idJogador === null) {
      this.isLoading.set(false);
      return;
    }

    this.guildaService.getByJogador(idJogador).subscribe({
      next: (guildas) => {
        this.guilda.set(guildas[0] ?? null);
        this.isLoading.set(false);
      },
      error: () => {
        this.guilda.set(null);
        this.isLoading.set(false);
      },
    });
  }
}
