import { ChangeDetectionStrategy, Component, OnInit, inject, input, signal } from '@angular/core';

import { MissaoRegistro } from '../../../core/models/missao-registro.model';
import { MissaoRegistroService } from '../../../core/services/missao-registro.service';

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

  readonly playerId = input<number | null>(null);
  readonly missions = signal<MissaoRegistro[]>([]);
  readonly isLoading = signal(true);

  ngOnInit(): void {
    // Carrega as missoes do jogador.
    const idJogador = this.playerId();
    if (idJogador === null) {
      this.isLoading.set(false);
      return;
    }

    this.missaoRegistroService.getByJogador(idJogador).subscribe({
      next: (registros) => {
        // Guarda as missoes do jogador.
        this.missions.set(registros);
        this.isLoading.set(false);
      },
      error: () => {
        this.missions.set([]);
        this.isLoading.set(false);
      },
    });
  }
}
